import { type Variants } from 'motion/react';

/**
 * Premium Cubic-Bezier Easing Curve
 * Inspired by luxury brand and top-tier creative agency visual transitions
 */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * Standard Viewport Trigger Options
 * Triggers when ~15% of the element enters the viewport, fires once per page load
 */
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.15,
  margin: '-40px 0px'
} as const;

/**
 * Fade In & Slide Up Variant
 */
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM
    }
  })
};

/**
 * Subtle Scale + Fade In for Image Containers
 */
export const imageRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.03
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration ?? 0.85,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM
    }
  })
};

/**
 * Stagger Container Variant for Lists, Grids and Metric Bars
 */
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { stagger?: number; delayChildren?: number } = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger ?? 0.12,
      delayChildren: custom.delayChildren ?? 0.05
    }
  })
};

/**
 * Stagger Item Variant
 */
export const staggerItemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE_PREMIUM
    }
  }
};

/**
 * Horizontal Slide Variants (for select alternating elements)
 */
export const horizontalSlideVariant = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -25 : 25
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
      ease: EASE_PREMIUM
    }
  })
});
