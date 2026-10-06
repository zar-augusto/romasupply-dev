import 'package:flutter/material.dart';
import 'app_colors.dart';

abstract class AppTheme {
  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true, 
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.blancoPuro,
    colorScheme: const ColorScheme.light(
      primary: AppColors.doradoCalidez, 
      onSurface: AppColors.negroCarbono,
    ),
  );

  static ThemeData get darkTheme => ThemeData(
    useMaterial3: true, 
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.negroCarbono,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.doradoCalidez, 
      surface: AppColors.darkSurface,
    ),
  );
}
