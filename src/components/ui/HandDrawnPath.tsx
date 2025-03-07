'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface HandDrawnPathProps {
  path: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
  delay?: number;
  duration?: number;
  draw?: boolean;
  viewBox?: string;
}

const HandDrawnPath: React.FC<HandDrawnPathProps> = ({
  path,
  width = 100,
  height = 100,
  strokeWidth = 2,
  strokeColor = 'currentColor',
  fillColor = 'none',
  className = '',
  delay = 0,
  duration = 2,
  draw = true,
  viewBox = '0 0 100 100'
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView && draw) {
      controls.start('visible');
    }
  }, [isInView, controls, draw]);
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          delay, 
          type: "spring", 
          duration, 
          bounce: 0 
        },
        opacity: { 
          delay, 
          duration: duration * 0.5 
        }
      }
    }
  };
  
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={path}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        animate={controls}
        variants={pathVariants}
        fill={fillColor}
        style={{ 
          strokeDasharray: '0 1',
        }}
      />
    </svg>
  );
};

export default HandDrawnPath; 