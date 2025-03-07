'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Animation variants for the menu items
const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Process', href: '/process' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.nav 
      className="fixed top-0 z-50 w-full"
      initial={{ backgroundColor: 'transparent' }}
      animate={{
        backgroundColor: hasScrolled ? 'rgba(249, 247, 241, 0.9)' : 'transparent',
        backdropFilter: hasScrolled ? 'blur(8px)' : 'none',
        boxShadow: hasScrolled ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className={`relative flex items-center justify-between px-6 mx-auto max-w-7xl transition-all duration-200 ${hasScrolled ? 'py-3' : 'py-4'}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10 overflow-hidden">
            <motion.div
              className="absolute w-full h-full"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <motion.path
                  d="M10,20 Q15,10 20,20 Q25,30 30,20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="text-ink transition-colors group-hover:text-ink-dark"
                />
              </svg>
            </motion.div>
          </div>
          <span className="text-xl font-bold tracking-tight font-hand text-ink transition-colors group-hover:text-ink-dark">Sketch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
            >
              <Link 
                href={item.href} 
                className={`relative px-2 py-1 text-lg transition-all duration-200 font-hand
                  ${pathname === item.href 
                    ? 'text-ink' 
                    : 'text-ink-light hover:text-ink'
                  }`
                }
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ y: 2 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink hover:text-ink-dark transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`absolute w-full bg-paper-light backdrop-blur-sm shadow-sm md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={item.href} 
                className={`block px-3 py-2 text-lg font-hand rounded-md transition-all duration-200 ${
                  pathname === item.href 
                    ? 'text-ink bg-paper' 
                    : 'text-ink-light hover:bg-paper hover:text-ink'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 