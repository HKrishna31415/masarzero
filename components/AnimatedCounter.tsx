
import React, { useEffect, useMemo } from 'react';
import { animate, useMotionValue, useTransform, motion } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  fractionDigits?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, fractionDigits = 0, prefix = '', suffix = '', className }) => {
  const count = useMotionValue(from);
  
  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1]
    });
    return controls.stop;
  }, [to, from, count]);

  // Fix: Replaced toLocaleString with Intl.NumberFormat to avoid TypeScript type definition issues.
  const formatter = useMemo(() => new Intl.NumberFormat('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
  }), [fractionDigits]);

  const formatted = useTransform(count, latest => 
      `${prefix}${formatter.format(latest)}${suffix}`
  );

  return <motion.span className={className}>{formatted}</motion.span>;
};

export default AnimatedCounter;
