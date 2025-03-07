'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface PaperTextureProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'lined' | 'grid' | 'dotted' | 'sketchy';
  elevation?: 'flat' | 'raised' | 'floating';
  torn?: boolean;
  rotate?: number;
  scribble?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const PaperTexture = memo<PaperTextureProps>(({
  children,
  className = '',
  variant = 'default',
  elevation = 'flat',
  torn = false,
  rotate = 0,
  scribble = false,
}) => {
  const [uniqueId, setUniqueId] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate a unique ID for the filter only once on mount
  useEffect(() => {
    setUniqueId(`noise-${Math.random().toString(36).substr(2, 9)}`);
    setIsMounted(true);
  }, []);

  // Get the appropriate CSS classes for the paper variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'lined':
        return 'bg-paper-light bg-notebook-line';
      case 'grid':
        return 'bg-paper-light bg-[linear-gradient(to_right,#e8e6d9_1px,transparent_1px),linear-gradient(to_bottom,#e8e6d9_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'dotted':
        return 'bg-paper-light bg-[radial-gradient(#e8e6d9_1px,transparent_1px)] bg-[size:20px_20px]';
      case 'sketchy':
        return 'bg-paper relative overflow-hidden';
      default:
        return 'bg-paper';
    }
  };

  // Get the appropriate CSS classes for the elevation
  const getElevationClasses = () => {
    switch (elevation) {
      case 'raised':
        return 'shadow-sketchbook';
      case 'floating':
        return 'shadow-polaroid';
      default:
        return '';
    }
  };

  // Generate random edge points for torn paper effect - simplified for performance
  const generateTornEdgePoints = (side: 'top' | 'right' | 'bottom' | 'left') => {
    // Pre-calculated points for better performance
    if (side === 'top') {
      return 'polygon(0% 5px, 10% 0px, 20% 3px, 30% 1px, 40% 4px, 50% 0px, 60% 2px, 70% 1px, 80% 3px, 90% 0px, 100% 4px, 100% 100%, 0% 100%)';
    }
    return undefined;
  };

  // Simpler rotation animation for better performance
  const getScribbleAnimation = () => {
    if (!scribble) return {};
    
    return {
      animate: {
        rotate: [0, -0.3, 0, 0.3, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    };
  };

  // Only render SVG effects client-side to avoid hydration issues
  const shouldRenderEffects = isMounted && typeof window !== 'undefined' && window.innerWidth > 768;

  // Fix for SVG nesting issues - separate the filter from content
  const NoiseFilter = () => {
    if (!shouldRenderEffects) return null;
    
    return (
      <div className="sr-only">
        <svg width="0" height="0" aria-hidden="true">
          <filter id={uniqueId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2" // Reduced octaves for better performance
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </svg>
      </div>
    );
  };

  // Render sketch lines separately to avoid nesting issues
  const SketchLines = () => {
    if (!shouldRenderEffects || variant !== 'sketchy') return null;
    
    return (
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C20,8 40,-5 60,12 C80,-3 100,15 120,5 C140,10 160,-3 180,7 C200,0 220,12 240,3 C260,15 280,-2 300,8" 
                strokeWidth="0.5" 
                stroke="#333" 
                fill="none" 
                transform="scale(0.5)" 
                opacity="0.5"
                strokeLinecap="round"
                strokeDasharray="1,2" />
          <path d="M0,40 C30,32 60,48 90,35 C120,50 150,30 180,42 C210,35 240,45 270,38 C300,46 330,32 360,41" 
                strokeWidth="0.5" 
                stroke="#333" 
                fill="none" 
                transform="scale(0.5) translate(0, 80)" 
                opacity="0.5"
                strokeLinecap="round"
                strokeDasharray="3,1" />
        </svg>
      </div>
    );
  };

  // Render border separately to avoid nesting issues
  const SketcyBorder = () => {
    if (!shouldRenderEffects) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent [mask-image:url('/images/sketchy-border.svg')] [mask-size:100%_100%]" />
    );
  };

  return (
    <>
      <NoiseFilter />
      
      <motion.div
        className={`relative bg-paper-light ${getVariantClasses()} ${getElevationClasses()} ${className}`}
        style={{
          filter: shouldRenderEffects ? `url(#${uniqueId})` : undefined,
          clipPath: torn ? generateTornEdgePoints('top') : undefined,
          transform: `rotate(${rotate}deg)`,
          willChange: scribble ? 'transform' : undefined,
        }}
        {...getScribbleAnimation()}
      >
        <SketchLines />
        <SketcyBorder />
        {children}
      </motion.div>
    </>
  );
});

PaperTexture.displayName = 'PaperTexture';

export default PaperTexture; 