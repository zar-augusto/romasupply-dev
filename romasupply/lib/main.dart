import 'package:flutter/material.dart';
import 'app/theme/app_theme.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp();
  // final fcmService = FcmService();
  // await fcmService.initialize();
  
  runApp(
    // const ProviderScope(
      const RomaSupplyApp()
    // )
  );
}

class RomaSupplyApp extends StatelessWidget {
  const RomaSupplyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RomaSupply',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      // routerConfig: appRouter,
      home: const Scaffold(
        body: Center(
          child: Text('RomaSupply E-Commerce App Inicializada'),
        ),
      ),
    );
  }
}
