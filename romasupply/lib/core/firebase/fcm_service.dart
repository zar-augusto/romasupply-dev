// Placeholder para FirebaseMessaging (requiere dependencias de firebase_messaging)

class FcmService {
  // final FirebaseMessaging _fcm = FirebaseMessaging.instance;

  Future<void> initialize() async {
    // await _fcm.requestPermission();
    // await _fcm.subscribeToTopic('drops_global');

    /*
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      final String? deepLink = message.data['deep_link'];
      if (deepLink != null) {
        // Enrutamiento directo al producto o pedido
        // appRouter.push(deepLink);
      }
    });
    */
  }
}
