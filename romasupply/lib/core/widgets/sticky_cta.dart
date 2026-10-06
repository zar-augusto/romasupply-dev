import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class StickyCtaWidget extends StatelessWidget {
  final double price;
  final VoidCallback onAddToCart;

  const StickyCtaWidget({
    super.key, 
    required this.price, 
    required this.onAddToCart,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      decoration: BoxDecoration(color: Theme.of(context).scaffoldBackgroundColor),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start, 
              children: [
                const Text('Precio Total', style: TextStyle(fontSize: 11, color: Colors.grey)),
                Text('\$${price.toStringAsFixed(2)} USD', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
              ]
            ),
            const SizedBox(width: 24),
            Expanded(
              child: SizedBox(
                height: 52,
                child: ElevatedButton(
                  onPressed: onAddToCart,
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.doradoCalidez),
                  child: const Text('AÑADIR AL CARRITO', style: TextStyle(fontWeight: FontWeight.w900, color: AppColors.blancoPuro)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
