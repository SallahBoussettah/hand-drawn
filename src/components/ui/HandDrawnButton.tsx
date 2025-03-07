'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HandDrawnButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'sketchy' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  animated?: boolean;
}

// Pre-computed paths for better performance
const precomputedScribblePaths = {
  small: "M3,15 C8,20 16,12 25,15 C34,18 42,12 50,15 C58,18 66,12 75,15 C84,18 92,12 97,15",
  medium: "M3,20 C10,27 22,16 35,20 C48,24 60,16 75,20 C90,24 102,16 117,20 C130,24 142,16 157,20",
  large: "M3,25 C14,34 30,20 45,25 C60,30 75,20 90,25 C105,30 120,20 135,25 C150,30 165,20 180,25"
};

// Memoized component to prevent unnecessary re-renders
const HandDrawnButton = memo<HandDrawnButtonProps>(({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  animated = true
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [uniqueId, setUniqueId] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Generate a unique ID for SVG filters
  useEffect(() => {
    setUniqueId(`button-${Math.random().toString(36).substr(2, 9)}`);
    // Check if we're on mobile for performance optimization
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  // Get pre-computed scribble path based on size
  const getScribblePath = () => {
    switch(size) {
      case 'sm': return precomputedScribblePaths.small;
      case 'lg': return precomputedScribblePaths.large;
      default: return precomputedScribblePaths.medium;
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'text-paper-light bg-ink hover:bg-ink-dark border-[3px] border-transparent relative';
      case 'secondary':
        return 'text-ink bg-paper-light hover:bg-paper border-[3px] border-transparent relative';
      case 'outline':
        return 'text-ink bg-transparent hover:bg-paper-light border-[3px] border-ink relative';
      case 'sketchy':
        return 'text-ink bg-paper hover:bg-paper-light relative overflow-visible';
      case 'accent':
        return 'text-ink-dark bg-paper border-[3px] border-dashed border-ink relative shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 hover:bg-paper-light font-bold';
      default:
        return 'text-paper-light bg-ink hover:bg-ink-dark border-[3px] border-transparent relative';
    }
  };

  // Common button styles
  const commonClasses = `
    inline-block rounded-none font-hand font-bold relative
    transition-all duration-200 ease-in-out
    ${sizeClasses[size]}
    ${getVariantClasses()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  // Animation variants - simplified for better performance
  const buttonVariants = {
    idle: { 
      scale: 1 
    },
    hover: { 
      scale: 1.02,
      rotate: isHovered ? 0.3 : 0,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      rotate: isPressed ? -0.3 : 0,
      transition: { duration: 0.1 }
    }
  };

  // Handle events to set state for animation
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // SVG filter for rough/sketchy effect - only on non-mobile
  const SvgFilter = () => {
    if (isMobile) return null;
    
    return (
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={uniqueId} filterUnits="userSpaceOnUse">
            <feTurbulence baseFrequency="0.05" numOctaves="2" type="fractalNoise" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>
    );
  };

  // Content wrapper with hover animations
  const ContentWrapper = memo(({ children }: { children: React.ReactNode }) => (
    <>
      <SvgFilter />
      <span className="relative z-10">
        {/* Text with simplified animation for better performance */}
        <motion.span
          className="inline-block"
          animate={isHovered && !isMobile ? {
            y: [0, -1, 0],
            x: [0, 0.5, 0],
          } : {}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.span>
      </span>

      {/* Sketchy button outline (only for sketchy variant and non-mobile) */}
      {variant === 'sketchy' && !isMobile && (
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 160 50`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            filter: isHovered ? `url(#${uniqueId})` : 'none'
          }}
          style={{ 
            overflow: 'visible',
            willChange: 'transform',
          }}
        >
          <motion.path
            d={getScribblePath()}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            animate={animated && !isMobile ? {
              strokeDashoffset: isHovered ? [30, 0] : 0,
            } : {}}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      )}
    </>
  ));
  
  ContentWrapper.displayName = 'ContentWrapper';

  // Render as link if href is provided
  if (href) {
    // Fix nested anchor issue by using a different approach
    return (
      <Link href={href} legacyBehavior passHref>
        <motion.a
          className={commonClasses}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ willChange: 'transform' }}
        >
          <ContentWrapper>{children}</ContentWrapper>
        </motion.a>
      </Link>
    );
  }

  // Render as button
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClasses}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ willChange: 'transform' }}
    >
      <ContentWrapper>{children}</ContentWrapper>
    </motion.button>
  );
});

HandDrawnButton.displayName = 'HandDrawnButton';

export default HandDrawnButton; 