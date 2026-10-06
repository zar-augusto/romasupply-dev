import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class PulsingHotspotWidget extends StatefulWidget {
  final VoidCallback onTap;
  const PulsingHotspotWidget({super.key, required this.onTap});

  @override 
  State<PulsingHotspotWidget> createState() => _PulsingHotspotWidgetState();
}

class _PulsingHotspotWidgetState extends State<PulsingHotspotWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override 
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 2))..repeat();
  }

  @override 
  void dispose() { 
    _controller.dispose(); 
    super.dispose(); 
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) => Stack(
          alignment: Alignment.center,
          children: [
            Container(
              width: 32 * _controller.value, 
              height: 32 * _controller.value,
              decoration: BoxDecoration(
                shape: BoxShape.circle, 
                color: AppColors.doradoCalidez.withOpacity(1.0 - _controller.value)
              ),
            ),
            Container(
              width: 18, 
              height: 18, 
              decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.doradoCalidez)
            ),
          ],
        ),
      ),
    );
  }
}
