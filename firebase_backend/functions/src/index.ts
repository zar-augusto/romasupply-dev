import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createOrderTransaction = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado.');
  
  const userId = context.auth.uid;
  const { cart_id, shipping_address, coupon_code } = data;

  return await db.runTransaction(async (transaction) => {
    // 1. FASE DE LECTURA (TODAS LAS LECTURAS PRIMERO)
    const cartRef = db.collection('carts').doc(cart_id);
    const cartDoc = await transaction.get(cartRef);
    
    if (!cartDoc.exists || cartDoc.data()?.user_id !== userId) {
      throw new functions.https.HttpsError('not-found', 'Carrito no válido.');
    }
    
    const items = cartDoc.data()!.items || [];
    
    // Recolectar referencias de variantes
    const variantRefs = items.map((item: any) => 
      db.collection('products').doc(item.product_id).collection('variants').doc(item.variant_id)
    );
    
    // Leer todos los documentos de variantes al mismo tiempo
    const variantDocs = variantRefs.length > 0 ? await transaction.getAll(...variantRefs) : [];
    
    let subtotal = 0;
    const validatedItems = [];
    const updates = [];
    
    // Validar stock y preparar escrituras
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const variantDoc = variantDocs[i];
      
      if (!variantDoc.exists || variantDoc.data()!.stock < item.quantity) {
        throw new functions.https.HttpsError('resource-exhausted', `Stock insuficiente para ${item.title}`);
      }
      
      subtotal += variantDoc.data()!.price * item.quantity;
      validatedItems.push({ ...item, price: variantDoc.data()!.price });
      updates.push({
        ref: variantRefs[i],
        newStock: variantDoc.data()!.stock - item.quantity
      });
    }
    
    // 2. FASE DE ESCRITURA (TODAS LAS ESCRITURAS AL FINAL)
    for (const update of updates) {
      transaction.update(update.ref, { stock: update.newStock });
    }
    
    const discount = coupon_code === 'ROMA10OFF' ? subtotal * 0.10 : 0;
    const total = subtotal - discount;
    const orderRef = db.collection('orders').doc();
    
    transaction.set(orderRef, {
      order_id: orderRef.id, 
      user_id: userId, 
      status: 'processing',
      shipping_address, 
      items: validatedItems,
      pricing: { subtotal, discount, shipping_cost: 0, total },
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });
    
    transaction.update(cartRef, { items: [], subtotal: 0 });
    
    return { success: true, order_id: orderRef.id, total };
  });
});
