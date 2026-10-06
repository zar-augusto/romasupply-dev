const admin = require('firebase-admin');

// Conectar explícitamente al emulador local
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

admin.initializeApp({
  projectId: "demo-romasupply"
});

const db = admin.firestore();

const seedData = async () => {
  console.log('🌱 Iniciando inyección de datos semilla en el Emulador de Firestore...');

  const batch = db.batch();

  // --- PRODUCTO 1: Hoodie ---
  const hoodieRef = db.collection('products').doc('prod_8829');
  batch.set(hoodieRef, {
    id: "prod_8829", 
    title: "Hoodie Oversize Roma", 
    slug: "hoodie-oversize-roma",
    category: "streetwear", 
    price: 89.00, 
    compare_at_price: 110.00,
    badge: "NUEVO", 
    is_active: true, 
    in_stock: true,
    images: { 
      flat_lay: "https://cdn.romasupply.com/hd-flat.jpg", 
      gallery: ["https://cdn.romasupply.com/hd-1.jpg", "https://cdn.romasupply.com/hd-2.jpg"] 
    },
    attributes: { 
      sizes: ["S", "M", "L"], 
      colors: ["Negro Carbono", "Blanco Puro"] 
    }
  });

  // Variante 1 del Hoodie
  const hoodieVar1 = hoodieRef.collection('variants').doc('var_101');
  batch.set(hoodieVar1, {
    id: "var_101", 
    product_id: "prod_8829", 
    sku: "RS-HD-001-BLK-M",
    size: "M", 
    color: "Negro Carbono", 
    price: 89.00, 
    stock: 14
  });

  // --- PRODUCTO 2: Camiseta ---
  const tshirtRef = db.collection('products').doc('prod_4412');
  batch.set(tshirtRef, {
    id: "prod_4412", 
    title: "Camiseta Essential Athleisure", 
    slug: "camiseta-essential-athleisure",
    category: "athleisure", 
    price: 45.00, 
    compare_at_price: 60.00,
    badge: "BEST SELLER", 
    is_active: true, 
    in_stock: true,
    images: { 
      flat_lay: "https://cdn.romasupply.com/ts-flat.jpg", 
      gallery: ["https://cdn.romasupply.com/ts-1.jpg"] 
    },
    attributes: { 
      sizes: ["M", "L", "XL"], 
      colors: ["Dorado Calidez"] 
    }
  });

  // Variante 1 de la Camiseta
  const tshirtVar1 = tshirtRef.collection('variants').doc('var_201');
  batch.set(tshirtVar1, {
    id: "var_201", 
    product_id: "prod_4412", 
    sku: "RS-TS-002-GLD-L",
    size: "L", 
    color: "Dorado Calidez", 
    price: 45.00, 
    stock: 8
  });

  await batch.commit();
  console.log('✅ Datos semilla inyectados con éxito. ¡Catálogo listo para pruebas!');
};

seedData().catch(console.error);
