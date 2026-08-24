import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  viewportMargin?: string;
  viewportAmount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  yOffset = 35,
  xOffset = 0,
  scale = 1,
  direction = 'up',
  viewportMargin = '-40px 0px',
  viewportAmount = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Calculate offsets based on direction if specified
  let initialY = yOffset;
  let initialX = xOffset;

  if (direction === 'up') {
    initialY = yOffset;
    initialX = 0;
  } else if (direction === 'down') {
    initialY = -yOffset;
    initialX = 0;
  } else if (direction === 'left') {
    initialX = -25;
    initialY = 0;
  } else if (direction === 'right') {
    initialX = 25;
    initialY = 0;
  } else if (direction === 'none') {
    initialY = 0;
    initialX = 0;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        x: initialX,
        scale: scale !== 1 ? scale : 1
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: viewportAmount,
        margin: viewportMargin
      }}
      transition={{
        duration,
        delay,
        ease: EASE_PREMIUM
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  viewportAmount?: number;
  viewportMargin?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.12,
  initialDelay = 0.05,
  viewportAmount = 0.15,
  viewportMargin = '-40px 0px'
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: viewportAmount,
        margin: viewportMargin
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 30,
  duration = 0.75
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: yOffset
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: EASE_PREMIUM
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  referrerPolicy?: React.HTMLAttributeReferencing;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  delay = 0,
  duration = 0.85,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer'
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden ${containerClassName}`}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          referrerPolicy={referrerPolicy}
          className={className}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        referrerPolicy={referrerPolicy}
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{
          duration,
          delay,
          ease: EASE_PREMIUM
        }}
        className={className}
      />
    </div>
  );
};
