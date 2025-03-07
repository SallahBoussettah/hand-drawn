'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnPath from '@/components/ui/HandDrawnPath';
import Layout from '@/components/layout/Layout';
import { useInView } from 'react-intersection-observer';

// Limit the number of decorative elements for better performance
const MAX_BACKGROUND_ELEMENTS = 8;

// Decorative SVG paths for visual elements
const decorativePaths = {
  wave: "M10,50 C30,40 50,60 70,50 C90,40 110,60 130,50 C150,40 170,60 190,50",
  circle: "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0",
  spiral: "M50,50 m-40,0 C20,70 70,80 50,20 C30,-10 110,0 70,50 C40,90 10,60 50,50",
  zigzag: "M0,25 L20,50 L40,25 L60,50 L80,25 L100,50",
  scribble: "M10,50 Q30,30 50,50 T90,50 T130,50 T170,50",
  squares: "M10,10 L40,10 L40,40 L10,40 Z M50,20 L80,20 L80,50 L50,50 Z M70,5 L90,5 L90,25 L70,25 Z",
  dots: "M10,10 L12,10 M30,15 L32,15 M50,10 L52,10 M70,20 L72,20 M90,15 L92,15",
  logo: "M30,40 Q50,20 70,40 Q90,60 110,40 M30,40 Q50,60 70,40 M70,40 Q90,20 110,40",
  star: "M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z",
  heart: "M50,30 Q60,10 70,30 T90,30 Q90,60 50,90 Q10,60 10,30 T30,30 Q40,10 50,30",
  // Smile path for the face
  smile: "M30,65 Q50,85 70,65",
  // Surprised expression
  surprised: "M30,70 Q50,60 70,70",
  // Neutral expression
  neutral: "M30,70 L70,70"
};

// SVG Face expressions
const faceExpressions = {
  happy: "M35,65 Q50,80 65,65",
  neutral: "M35,65 L65,65",
  surprised: "M35,65 Q50,55 65,65"
};

// Pre-compute random paths for better performance
const precomputedRandomPaths = Array.from({ length: MAX_BACKGROUND_ELEMENTS }).map(() => {
  const randomPath = Object.values(decorativePaths)[Math.floor(Math.random() * Object.keys(decorativePaths).length)];
  return {
    path: randomPath,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotate: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  };
});

export default function Home() {
  const [rotations, setRotations] = useState<number[]>([0, 0, 0]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState('neutral');
  const [backgroundElements, setBackgroundElements] = useState([]);
  const ticking = useRef(false);
  
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true // Only trigger once for better performance
  });
  
  const [projectsRef, projectsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    controls.start('visible');
    
    // Generate random rotations after component mounts
    setRotations(Array(3).fill(0).map(() => Math.random() * 2 - 1));
  }, [controls]);

  // Optimized mouse move handler with requestAnimationFrame for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to container
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        setMousePosition({ x, y });
        
        // Update face expression based on vertical mouse position
        if (y < 0.3) {
          setExpression("happy");
        } else if (y > 0.7) {
          setExpression("surprised");
        } else {
          setExpression("neutral");
        }
        
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', mousePosition.x.toString());
      containerRef.current.style.setProperty('--mouse-y', mousePosition.y.toString());
    }
  }, [mousePosition]);

  return (
    <Layout>
      <div ref={containerRef} className="relative overflow-x-hidden">
        {/* Background scribbles - reduced quantity for better performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {precomputedRandomPaths.map((item, i) => (
            <motion.div
              key={i}
              className="absolute opacity-[0.03] will-change-transform"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.03 }}
              transition={{ 
                duration: item.duration,
                delay: item.delay,
                ease: "easeInOut"
              }}
              style={{
                top: item.top,
                left: item.left,
                transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
              }}
            >
              <svg width="200" height="200" viewBox="0 0 200 200" className="text-ink">
                <path
                  d={item.path}
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative pt-28 pb-28 overflow-hidden"
          style={{
            transform: `translate(calc(var(--mouse-x, 0.5) * -5px), calc(var(--mouse-y, 0.5) * -5px))`,
            transition: "transform 0.5s ease-out",
            willChange: "transform"
          }}
        >
          <div className="container relative z-10 px-4 mx-auto">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
              {/* Interactive Face */}
              <motion.div
                className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <PaperTexture 
                  className="w-full h-full rounded-full" 
                  elevation="floating" 
                  variant="default"
                >
                  {/* Face Container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Face outline */}
                    <div className="absolute inset-4 border-2 border-ink rounded-full"></div>
                    
                    {/* Cap/Hat - Added to match sketch */}
                    <div className="absolute" style={{ top: "12%", width: "70%" }}>
                      <svg viewBox="0 0 100 50" width="100%" height="100%">
                        <path 
                          d="M30,30 C40,15 60,15 70,30 M25,40 C40,25 60,25 75,40" 
                          stroke="#333" 
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    
                    {/* Left Eye */}
                    <motion.div
                      className="absolute bg-ink rounded-full w-3 h-3 md:w-4 md:h-4"
                      style={{ 
                        top: "40%", 
                        left: "35%",
                      }}
                      animate={{ 
                        x: (mousePosition.x - 0.5) * 10,
                        y: (mousePosition.y - 0.5) * 5
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    {/* Right Eye */}
                    <motion.div
                      className="absolute bg-ink rounded-full w-3 h-3 md:w-4 md:h-4"
                      style={{ 
                        top: "40%", 
                        left: "65%",
                      }}
                      animate={{ 
                        x: (mousePosition.x - 0.5) * 10,
                        y: (mousePosition.y - 0.5) * 5
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    {/* Nose - simple vertical line */}
                    <div className="absolute bg-ink" style={{ 
                      top: "50%", 
                      left: "50%", 
                      transform: "translateX(-50%)", 
                      width: "2px", 
                      height: "12%"
                    }}></div>
                    
                    {/* Mouth */}
                    <motion.div
                      className="absolute"
                      style={{ top: "65%", width: "50%" }}
                    >
                      <svg viewBox="0 0 100 40" width="100%" height="100%">
                        <motion.path
                          d={faceExpressions[expression as keyof typeof faceExpressions]}
                          stroke="#333"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          animate={{ d: faceExpressions[expression as keyof typeof faceExpressions] }}
                          transition={{ duration: 0.3 }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                </PaperTexture>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl font-hand will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="relative inline-block">
                  Hand-Drawn
                  <motion.div 
                    className="absolute bottom-2 left-0 w-full h-1 bg-ink-light will-change-transform"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                </span>{' '}
                <span className="relative inline-block">
                  Portfolio
                  <motion.div 
                    className="absolute bottom-2 left-0 w-full h-1 bg-ink-light will-change-transform"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  />
                </span>{' '}
                <span className="relative inline-block">
                  Website
                  <motion.div 
                    className="absolute bottom-2 left-0 w-full h-1 bg-ink-light will-change-transform"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  />
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p
                className="max-w-2xl mb-10 text-xl text-ink font-hand"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                A creative digital sketchbook showcasing work through interactive hand-drawn
                elements and imaginative animations.
              </motion.p>
              
              {/* CTAs */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <HandDrawnButton href="/portfolio" variant="sketchy" size="lg">
                  View Portfolio
                </HandDrawnButton>
                <HandDrawnButton href="/contact" variant="outline" size="lg">
                  Get in Touch
                </HandDrawnButton>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative corner elements - only show on larger screens */}
          <div className="absolute top-10 left-10 opacity-20 md:opacity-40 hidden md:block">
            <HandDrawnPath 
              path={decorativePaths.squares} 
              width={100} 
              height={50}
              strokeWidth={1}
              className="text-ink-light"
            />
          </div>
          
          <div className="absolute bottom-10 right-10 opacity-20 md:opacity-40 hidden md:block">
            <HandDrawnPath 
              path={decorativePaths.zigzag} 
              width={100} 
              height={50}
              strokeWidth={1}
              className="text-ink-light"
            />
          </div>
        </section>

        {/* Featured Projects Section */}
        <section 
          ref={projectsRef}
          className="py-16 md:py-20"
        >
          <div className="container px-4 mx-auto">
            <motion.div 
              className="flex flex-col items-center justify-center mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl font-hand">Featured Projects</h2>
              <div className="w-20 h-1 mb-6 bg-ink-light"></div>
              <p className="max-w-2xl text-lg text-center text-ink font-hand">
                Selected works that showcase my approach to creative problem-solving and design thinking.
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className="will-change-transform"
                >
                  <PaperTexture className="h-full overflow-hidden transition-all duration-300 hover:rotate-1" elevation="floating" rotate={rotations[index]}>
                    <div className="p-6">
                      <div className="relative w-full h-48 mb-4 overflow-hidden">
                        {/* Simplified corner marks for better performance */}
                        <div className="absolute top-0 left-0 w-8 h-8">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M2 22 L2 2 L22 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="absolute top-0 right-0 w-8 h-8">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M22 22 L22 2 L2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 w-8 h-8">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M2 2 L2 22 L22 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8">
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path d="M22 2 L22 22 L2 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        
                        {/* Project Image */}
                        <div className="flex items-center justify-center w-full h-full text-xl font-hand bg-paper-dark">
                          Project Image
                        </div>
                      </div>
                      
                      <h3 className="mb-2 text-xl font-bold font-hand">{`Project ${item}`}</h3>
                      
                      <p className="mb-4 text-base text-ink font-hand">
                        A description of the project and the problem it solves. This showcases my skills and approach.
                      </p>
                      
                      <HandDrawnButton 
                        href="/portfolio" 
                        variant="sketchy"
                      >
                        View Details
                      </HandDrawnButton>
                    </div>
                  </PaperTexture>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me Teaser */}
        <section 
          ref={aboutRef} 
          className="py-16 md:py-20 bg-paper-light"
        >
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
              {/* Left column - Image */}
              <motion.div 
                className="w-full mb-8 md:w-5/12 md:mb-0 will-change-transform"
                initial={{ opacity: 0, x: -20 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <PaperTexture className="relative overflow-hidden aspect-square" elevation="floating" variant="sketchy">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Hand-drawn illustration */}
                    <div className="relative w-4/5 h-4/5">
                      {/* Face with cap illustration */}
                      <svg viewBox="0 0 200 200" width="100%" height="100%" className="absolute inset-0">
                        {/* Face outline */}
                        <motion.path 
                          d="M100,40 C140,40 150,80 150,120 C150,160 125,180 100,180 C75,180 50,160 50,120 C50,80 60,40 100,40 Z" 
                          stroke="#333" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={aboutInView ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 2, delay: 0.3 }}
                        />
                        
                        {/* Cap/Hat */}
                        <motion.path 
                          d="M70,60 C90,40 110,40 130,60 M65,75 C90,55 110,55 135,75" 
                          stroke="#333" 
                          strokeWidth="2" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={aboutInView ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                        />
                        
                        {/* Eyes */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        >
                          {/* Left eye */}
                          <circle cx="80" cy="100" r="8" stroke="#333" strokeWidth="1.5" fill="none" />
                          <circle cx="83" cy="97" r="2.5" fill="#333" />
                          
                          {/* Right eye */}
                          <circle cx="120" cy="100" r="8" stroke="#333" strokeWidth="1.5" fill="none" />
                          <circle cx="123" cy="97" r="2.5" fill="#333" />
                        </motion.g>
                        
                        {/* Nose */}
                        <motion.path 
                          d="M100,110 L100,130" 
                          stroke="#333" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={aboutInView ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 0.7, delay: 1.5 }}
                        />
                        
                        {/* Smile */}
                        <motion.path 
                          d="M70,145 C85,165 115,165 130,145" 
                          stroke="#333" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={aboutInView ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 1, delay: 1.8 }}
                        />
                        
                        {/* Decorative elements */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.8, delay: 2.2 }}
                        >
                          {/* Code/design elements */}
                          <path d="M30,30 L40,20 L50,30" stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M150,30 L160,20 L170,30" stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M30,170 L40,180 L50,170" stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M150,170 L160,180 L170,170" stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" />
                        </motion.g>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Decorative circle around portrait */}
                  <div className="absolute inset-0">
                    <HandDrawnPath
                      path={decorativePaths.circle}
                      width={100}
                      height={100}
                      strokeWidth={2}
                      className="w-full h-full text-ink-light"
                    />
                  </div>
                </PaperTexture>
              </motion.div>
              
              {/* Right column - Content */}
              <motion.div 
                className="w-full md:w-6/12 will-change-transform"
                initial={{ opacity: 0, x: 20 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="mb-4 text-3xl font-bold md:text-4xl font-hand">About Me</h2>
                <div className="w-20 h-1 mb-6 bg-ink-light"></div>
                
                <p className="mb-4 text-lg text-ink font-hand">
                  Creative designer & developer crafting unique digital experiences.
                </p>
                
                <p className="mb-6 text-base text-ink font-hand">
                  I combine artistic sensibilities with technical skills to create memorable 
                  digital experiences that connect with users on an emotional level.
                </p>
                
                <HandDrawnButton href="/about" variant="sketchy">
                  Learn More About Me
                </HandDrawnButton>
              </motion.div>
            </div>
          </div>
        </section>
    </div>
    </Layout>
  );
}
