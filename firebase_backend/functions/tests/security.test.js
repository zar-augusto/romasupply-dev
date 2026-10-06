// Requiere @firebase/rules-unit-testing
// describe(' Auditoría de Reglas de Seguridad Firestore', () => {
//   test('Permite lectura pública de catálogo', async () => {
//     const db = testEnv.unauthenticatedContext().firestore();
//     await assertSucceeds(db.collection('products').doc('prod_8829').get());
//   });
//   test('Bloquea auto-elevación a rol Admin', async () => {
//     const db = testEnv.authenticatedContext('usr_carlos').firestore();
//     await assertFails(db.collection('users').doc('usr_carlos').update({ role: 'admin' }));
//   });
//   test('Bloquea creación directa de órdenes desde el cliente', async () => {
//     const db = testEnv.authenticatedContext('usr_carlos').firestore();
//     await assertFails(db.collection('orders').doc('ord_hack').set({ user_id: 'usr_carlos', total: 0.01 }));
//   });
// });
