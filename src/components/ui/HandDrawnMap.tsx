import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HandDrawnMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const HandDrawnMap: React.FC<HandDrawnMapProps> = ({ className = '' }) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  
  // Paths for map features
  const paths = {
    mapOutline: "M20,20 C25,10 75,15 100,10 C150,5 200,15 250,10 C300,5 350,15 380,20 C385,50 380,100 385,150 C380,200 385,250 380,280 C350,285 300,275 250,280 C200,285 150,275 100,280 C75,285 20,275 15,280 C15,250 20,200 15,150 C20,100 15,50 20,20 Z",
    mountains: "M310,50 L330,30 L350,50 M370,40 L385,25 L400,40",
    medina: "M210,150 C220,140 240,145 245,160 C250,175 240,190 225,190 C210,190 200,175 205,160 C210,150 210,155 210,150 Z",
    gardens: "M150,130 C155,120 165,120 170,130 C175,140 170,150 160,150 C150,150 145,140 150,130 M160,140 L160,130 M155,135 L165,135",
    mosque: "M280,130 L280,150 M270,130 L290,130 L290,150 L270,150 Z M280,120 L280,130",
    palaces: "M240,220 L240,250 L260,250 L260,220 Z M240,220 L260,220 M245,220 L245,250 M255,220 L255,250 M245,230 L255,230 M245,240 L255,240",
    locationX: "M180,200 L190,210 M180,210 L190,200"
  };

  const handleInteraction = (area: string) => {
    setHoveredArea(area);
    setActiveArea(area);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  // Function to determine which area's info to show - use active area if set, otherwise use hovered area
  const getDisplayArea = () => activeArea || hoveredArea;
  
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Aged paper background with Moroccan warm tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100"></div>
        
        {/* Paper texture */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <filter id="paper-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise)" />
        </svg>
        
        {/* Moroccan pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <pattern id="moroccan-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 L40,20 M20,0 L20,40 M0,0 L40,40 M40,0 L0,40" stroke="#c2410c" strokeWidth="1" />
            <circle cx="20" cy="20" r="5" fill="none" stroke="#c2410c" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
        </svg>
      </div>
      
      <svg 
        viewBox="0 0 400 300" 
        className="relative w-full h-full z-10"
        style={{ filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Map outlines */}
        <motion.path
          d={paths.mapOutline}
          fill="#f8e8d1"
          stroke="#b45309"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        {/* Compass rose with Moroccan star pattern */}
        <motion.g 
          transform="translate(60, 60)" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <circle r="18" fill="none" stroke="#b45309" strokeWidth="1" />
          <path d="M0,-18 L0,18 M-18,0 L18,0 M-12,-12 L12,12 M12,-12 L-12,12" stroke="#b45309" strokeWidth="1" />
          <path d="M0,-23 L-5,-18 L0,-13 L5,-18 L0,-23" fill="#b45309" />
          <text x="0" y="-28" textAnchor="middle" className="text-xs font-hand fill-current text-amber-900">N</text>
          <text x="25" y="0" textAnchor="middle" className="text-xs font-hand fill-current text-amber-900">E</text>
          <text x="0" y="28" textAnchor="middle" className="text-xs font-hand fill-current text-amber-900">S</text>
          <text x="-25" y="0" textAnchor="middle" className="text-xs font-hand fill-current text-amber-900">W</text>
        </motion.g>
        
        {/* Map features with hover and click effects */}
        <g>
          {/* Atlas Mountains */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            onMouseEnter={() => handleInteraction('mountains')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('mountains')}
            className="cursor-pointer"
          >
            <path
              d={paths.mountains}
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Add hit area */}
            <rect x="300" y="25" width="100" height="50" fill="transparent" />
          </motion.g>
          
          {/* Medina */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            onMouseEnter={() => handleInteraction('medina')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('medina')}
            className="cursor-pointer"
          >
            <path
              d={paths.medina}
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Add hit area */}
            <circle cx="227" cy="165" r="30" fill="transparent" />
          </motion.g>
          
          {/* Majorelle Garden */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            onMouseEnter={() => handleInteraction('gardens')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('gardens')}
            className="cursor-pointer"
          >
            <path
              d={paths.gardens}
              fill="none"
              stroke="#0369a1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Add hit area */}
            <circle cx="160" cy="135" r="30" fill="transparent" />
          </motion.g>
          
          {/* Koutoubia Mosque */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            onMouseEnter={() => handleInteraction('mosque')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('mosque')}
            className="cursor-pointer"
          >
            <path
              d={paths.mosque}
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Add hit area */}
            <rect x="260" y="110" width="40" height="50" fill="transparent" />
          </motion.g>
          
          {/* Bahia Palace */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            onMouseEnter={() => handleInteraction('palaces')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('palaces')}
            className="cursor-pointer"
          >
            <path
              d={paths.palaces}
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Add hit area */}
            <rect x="230" y="210" width="40" height="50" fill="transparent" />
          </motion.g>
          
          {/* Location mark - "X marks the spot" */}
          <motion.g
            onMouseEnter={() => handleInteraction('studio')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleInteraction('studio')}
            className="cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <path
              d={paths.locationX}
              stroke="#c2410c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle 
              cx="185" 
              cy="205" 
              r="15" 
              fill="none" 
              stroke="#c2410c" 
              strokeWidth="2" 
              strokeDasharray="3 1"
            />
            {/* Add hit area */}
            <circle cx="185" cy="205" r="25" fill="transparent" />
          </motion.g>
        </g>
        
        {/* Decorative elements */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {/* Desert with palm trees */}
          <path 
            d="M70,250 L100,250 L130,250" 
            fill="none" 
            stroke="#b45309" 
            strokeWidth="2"
          />
          <path 
            d="M80,250 C80,240 75,235 80,230 C85,235 80,240 80,250" 
            fill="none" 
            stroke="#166534" 
            strokeWidth="2"
          />
          <path 
            d="M120,250 C120,240 115,235 120,230 C125,235 120,240 120,250" 
            fill="none" 
            stroke="#166534" 
            strokeWidth="2"
          />
          
          {/* Camels */}
          <path 
            d="M320,230 C323,227 325,230 328,230 C330,230 332,232 335,230 L338,240 L330,240 L325,230" 
            fill="none" 
            stroke="#b45309" 
            strokeWidth="1.5"
          />
        </motion.g>
        
        {/* Labels */}
        <g className="fill-current text-amber-900 font-hand">
          <motion.text 
            x="350" 
            y="45" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Atlas Mountains
          </motion.text>
          
          <motion.text 
            x="227" 
            y="170" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Medina
          </motion.text>
          
          <motion.text 
            x="160" 
            y="125" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            Jardin Majorelle
          </motion.text>
          
          <motion.text 
            x="280" 
            y="120" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            Koutoubia
          </motion.text>
          
          <motion.text 
            x="250" 
            y="270" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            Bahia Palace
          </motion.text>
          
          <motion.text 
            x="185" 
            y="230" 
            textAnchor="middle"
            className="font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            DESIGN STUDIO
          </motion.text>
          
          <motion.text 
            x="100" 
            y="280" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Palmeraie
          </motion.text>
          
          <motion.text 
            x="320" 
            y="250" 
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Agafay Desert
          </motion.text>
        </g>
      </svg>
      
      {/* Information panel */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4 bg-amber-50 border-2 border-amber-800 border-dashed p-3 font-hand text-amber-900 rounded-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        {getDisplayArea() === 'studio' && (
          <p>
            <span className="font-bold">Design Studio:</span> Rue Yves Saint Laurent, Gueliz, Marrakech, Morocco
          </p>
        )}
        {getDisplayArea() === 'mountains' && (
          <p>The Atlas Mountains inspire my designs with their majestic heights and dramatic landscapes.</p>
        )}
        {getDisplayArea() === 'medina' && (
          <p>The ancient Medina with its vibrant souks and narrow streets influences my colorful pattern work.</p>
        )}
        {getDisplayArea() === 'gardens' && (
          <p>Jardin Majorelle's vibrant blues and lush greenery inspire my color palettes and organic designs.</p>
        )}
        {getDisplayArea() === 'mosque' && (
          <p>Koutoubia Mosque's elegant proportions and intricate details influence my architectural elements.</p>
        )}
        {getDisplayArea() === 'palaces' && (
          <p>Bahia Palace's ornate tilework and carved cedar are reflected in my detailed pattern designs.</p>
        )}
        {!getDisplayArea() && (
          <div>
            <p className="mb-2">Explore Marrakech's creative landscape! Tap or hover over landmarks to learn more.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button 
                onClick={() => setActiveArea('studio')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Design Studio
              </button>
              <button 
                onClick={() => setActiveArea('medina')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Medina
              </button>
              <button 
                onClick={() => setActiveArea('gardens')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Jardin Majorelle
              </button>
              <button 
                onClick={() => setActiveArea('mosque')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Koutoubia
              </button>
              <button 
                onClick={() => setActiveArea('palaces')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Bahia Palace
              </button>
              <button 
                onClick={() => setActiveArea('mountains')}
                className="px-2 py-1 text-sm bg-amber-100 border border-amber-800 rounded hover:bg-amber-200"
              >
                Atlas Mountains
              </button>
            </div>
          </div>
        )}
        {getDisplayArea() && (
          <button
            onClick={() => setActiveArea(null)}
            className="mt-2 text-sm underline"
          >
            Back to map overview
          </button>
        )}
      </motion.div>
      
      {/* Torn paper effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default HandDrawnMap; 