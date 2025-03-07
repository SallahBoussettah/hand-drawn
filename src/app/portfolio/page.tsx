'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnPath from '@/components/ui/HandDrawnPath';

// Portfolio project type
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
}

export default function Portfolio() {
  // Sample portfolio projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'Hand-Drawn Website',
      description: 'A creative website with hand-drawn elements and interactive animations.',
      category: 'web',
      image: '/placeholder.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'Brand Identity',
      description: 'Complete branding package including logo, style guide, and marketing materials.',
      category: 'branding',
      image: '/placeholder.jpg',
      featured: true,
    },
    {
      id: 3,
      title: 'E-commerce App',
      description: 'Mobile application for an artisanal product marketplace.',
      category: 'mobile',
      image: '/placeholder.jpg',
      featured: false,
    },
    {
      id: 4,
      title: 'Illustrated Blog',
      description: 'Custom illustrations and layout design for a storytelling blog.',
      category: 'illustration',
      image: '/placeholder.jpg',
      featured: true,
    },
    {
      id: 5,
      title: 'Photography Portfolio',
      description: 'Minimalist design showcasing photography work with subtle animations.',
      category: 'web',
      image: '/placeholder.jpg',
      featured: false,
    },
    {
      id: 6,
      title: 'Product Packaging',
      description: 'Custom packaging design with hand-drawn elements for a food product line.',
      category: 'branding',
      image: '/placeholder.jpg',
      featured: false,
    },
  ];

  // Filter states
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Design' },
    { id: 'branding', name: 'Branding' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'illustration', name: 'Illustration' },
  ];

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  // Decorative SVG paths
  const decorativePaths = {
    zigzag: "M0,25 L20,5 L40,25 L60,5 L80,25 L100,5",
    wave: "M0,20 C20,40 40,0 60,20 C80,40 100,0 120,20",
  };

  return (
    <Layout>
      <div className="min-h-screen bg-paper-light">
        {/* Hero Section */}
        <section className="px-4 pt-12 pb-16 sm:px-6 md:pt-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-ink font-script">
                Portfolio
              </h1>
              <p className="mx-auto max-w-2xl text-xl font-hand text-ink-light">
                A collection of creative projects showcasing my work in design and development
              </p>
            </motion.div>

            {/* Category Filters */}
            <div className="mb-12">
              <PaperTexture className="p-6" elevation="raised" variant="default" rotate={0.5}>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`relative px-4 py-2 text-lg font-hand transition-all duration-300 rounded-md ${
                          activeCategory === category.id
                            ? 'text-ink bg-paper-dark font-bold'
                            : 'text-ink-light hover:text-ink hover:bg-paper'
                        }`}
                      >
                        {activeCategory === category.id && (
                          <motion.div
                            className="absolute inset-0 border-2 border-dashed border-ink rounded-md"
                            layoutId="categoryHighlight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <span className="relative z-10">{category.name}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </PaperTexture>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-full"
                  >
                    <PaperTexture 
                      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:rotate-1" 
                      elevation="floating" 
                      rotate={Math.random() * 1.5 - 0.75}
                    >
                      <div className="relative p-1">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dark">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-hand text-ink-light">Project Image</span>
                          </div>
                          
                          {/* Featured badge */}
                          {project.featured && (
                            <div className="absolute top-2 right-2 rotate-12">
                              <PaperTexture 
                                className="px-3 py-1" 
                                elevation="raised" 
                                variant="default" 
                                rotate={3}
                              >
                                <span className="text-sm font-bold font-hand text-ink">Featured</span>
                              </PaperTexture>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col flex-grow p-6">
                        <h3 className="mb-2 text-xl font-bold font-script text-ink">{project.title}</h3>
                        <p className="mb-4 font-hand text-ink-light">{project.description}</p>
                        <div className="mt-auto">
                          <span className="inline-block px-3 py-1 mb-4 text-sm font-hand bg-paper-dark text-ink-light rounded-full">
                            {categories.find(c => c.id === project.category)?.name || project.category}
                          </span>
                          <HandDrawnButton 
                            href={`/portfolio/project-${project.id}`} 
                            variant="secondary" 
                            size="sm"
                          >
                            View Project
                          </HandDrawnButton>
                        </div>
                      </div>
                    </PaperTexture>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <PaperTexture className="p-8 text-center" elevation="raised" variant="lined" rotate={0}>
                <HandDrawnPath
                  path={decorativePaths.zigzag}
                  width={120}
                  height={40}
                  strokeWidth={2}
                  strokeColor="#555"
                  className="mx-auto mb-4"
                />
                <h3 className="mb-2 text-xl font-bold font-script text-ink">No projects found</h3>
                <p className="mb-4 font-hand text-ink-light">
                  No projects match the selected category. Try selecting a different category.
                </p>
                <HandDrawnButton 
                  onClick={() => setActiveCategory('all')} 
                  variant="outline"
                >
                  View All Projects
                </HandDrawnButton>
              </PaperTexture>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 bg-paper">
          <div className="mx-auto max-w-7xl">
            <PaperTexture className="p-8 py-16 text-center" elevation="floating" variant="default" rotate={-0.5}>
              <HandDrawnPath
                path={decorativePaths.wave}
                width={160}
                height={40}
                strokeWidth={3}
                strokeColor="#333"
                className="mx-auto mb-6"
              />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-3xl font-bold text-ink font-script"
              >
                Have a Project in Mind?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-2xl mx-auto mb-8 font-hand text-ink-light"
              >
                I&apos;m always open to discussing new projects and creative ideas. If you&apos;re interested in 
                working together, let&apos;s get in touch!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <HandDrawnButton href="/contact" size="lg" variant="accent">
                  Start a Conversation
                </HandDrawnButton>
              </motion.div>
            </PaperTexture>
          </div>
        </section>
      </div>
    </Layout>
  );
} 