'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnPath from '@/components/ui/HandDrawnPath';

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
}

export default function Blog() {
  // Filter states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [postRotations, setPostRotations] = useState<number[]>([]);

  // Sample blog data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Art of Hand-Drawn Web Design',
      date: 'May 15, 2023',
      category: 'design',
      excerpt: 'Exploring how traditional art techniques can elevate digital experiences and create more engaging websites.',
      content: 'This is a full blog post content that would explain the entire topic in detail...',
      tags: ['design', 'illustration', 'web development'],
      featured: true
    },
    {
      id: 2,
      title: 'Creating SVG Animations That Feel Organic',
      date: 'April 22, 2023',
      category: 'development',
      excerpt: 'Technical approaches to making digital animations feel more natural and hand-crafted.',
      content: 'This is a full blog post content that would explain the entire topic in detail...',
      tags: ['svg', 'animation', 'javascript'],
      featured: true
    },
    {
      id: 3,
      title: 'User Experience in Artistic Websites',
      date: 'March 10, 2023',
      category: 'ux',
      excerpt: 'Balancing creative expression with usability considerations in artistically-driven web design.',
      content: 'This is a full blog post content that would explain the entire topic in detail...',
      tags: ['ux', 'design', 'accessibility'],
      featured: false
    },
    {
      id: 4,
      title: 'The Psychology of Handcrafted Aesthetics',
      date: 'February 18, 2023',
      category: 'theory',
      excerpt: 'Why do users connect more deeply with websites that appear handmade? A look at the psychological factors.',
      content: 'This is a full blog post content that would explain the entire topic in detail...',
      tags: ['psychology', 'design theory', 'user research'],
      featured: false
    },
    {
      id: 5,
      title: 'Tools for Creating Digital Hand-Drawn Elements',
      date: 'January 25, 2023',
      category: 'resources',
      excerpt: 'A review of the best software, plugins, and libraries for creating authentic hand-drawn digital art.',
      content: 'This is a full blog post content that would explain the entire topic in detail...',
      tags: ['tools', 'resources', 'illustration'],
      featured: false
    },
  ];

  // Now useEffect comes after blogPosts definition
  useEffect(() => {
    // Generate random rotations after component mounts
    setPostRotations(
      Array(blogPosts.length).fill(0).map(() => Math.random() * 1 - 0.5)
    );
  }, [blogPosts.length]); // Added blogPosts.length as a dependency

  // All unique categories from blog posts
  const categories = [
    { id: 'all', name: 'All Posts' },
    ...Array.from(new Set(blogPosts.map(post => post.category)))
      .map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1)
      }))
  ];

  // Filter blog posts based on active category and search query
  const filteredPosts = blogPosts
    .filter(post => activeCategory === 'all' || post.category === activeCategory)
    .filter(post => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });

  // Decorative path elements
  const decorativePaths = {
    underline: "M0,10 C10,0 20,20 30,10 C40,0 50,20 60,10 C70,0 80,20 90,10 C100,0 110,20 120,10",
    corner: "M0,20 C0,10 10,0 20,0",
    notebook: "M0,0 L0,100 M20,0 L20,100 M40,0 L40,100 M60,0 L60,100 M80,0 L80,100"
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
                Blog & Journal
              </h1>
              <p className="mx-auto max-w-2xl text-xl font-hand text-ink-light">
                Thoughts, insights, and creative explorations from my sketchbook to yours
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="mb-12">
              <PaperTexture className="p-6" elevation="raised" variant="lined" rotate={0.2}>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  {/* Search Box */}
                  <div className="flex-1">
                    <label htmlFor="search" className="sr-only">Search posts</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        placeholder="Search blog posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 font-hand bg-paper-light border-2 border-dashed border-pencil focus:border-ink focus:outline-none rounded-md"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`relative px-3 py-1.5 text-sm font-hand transition-all duration-300 rounded-md ${
                          activeCategory === category.id
                            ? 'text-ink bg-paper-dark font-bold'
                            : 'text-ink-light hover:text-ink hover:bg-paper'
                        }`}
                      >
                        {activeCategory === category.id && (
                          <motion.div
                            className="absolute inset-0 border-2 border-dashed border-ink rounded-md"
                            layoutId="blogCategoryHighlight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <span className="relative z-10">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </PaperTexture>
            </div>

            {/* Featured Posts Carousel */}
            {filteredPosts.some(post => post.featured) && (
              <div className="mb-16">
                <h2 className="mb-6 text-2xl font-bold font-script text-ink">Featured Posts</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredPosts
                    .filter(post => post.featured)
                    .map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <PaperTexture
                          className="h-full p-0 overflow-hidden"
                          elevation="floating"
                          rotate={postRotations[index] || 0}
                        >
                          <div className="relative">
                            {/* Featured badge */}
                            <div className="absolute top-4 right-4 z-10 rotate-12">
                              <PaperTexture 
                                className="px-3 py-1" 
                                elevation="raised" 
                                variant="default" 
                                rotate={3}
                              >
                                <span className="text-sm font-bold font-hand text-ink">Featured</span>
                              </PaperTexture>
                            </div>
                            
                            {/* Post Image */}
                            <div className="relative w-full h-48 bg-paper-dark">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-hand text-ink-light">Post Image</span>
                              </div>
                            </div>
                            
                            {/* Post Content */}
                            <div className="p-6 bg-paper">
                              <h3 className="mb-2 text-2xl font-bold font-script text-ink">{post.title}</h3>
                              <div className="flex items-center mb-4 text-sm font-hand text-ink-light">
                                <span>{post.date}</span>
                                <span className="mx-2">•</span>
                                <span className="capitalize">{post.category}</span>
                              </div>
                              <p className="mb-4 font-hand text-ink-light">{post.excerpt}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, i) => (
                                  <span 
                                    key={i} 
                                    className="px-2 py-1 text-xs font-hand bg-paper-dark text-ink-light rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              <HandDrawnButton href={`/blog/post-${post.id}`} variant="secondary" size="sm">
                                Read More
                              </HandDrawnButton>
                            </div>
                          </div>
                        </PaperTexture>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="mb-6 text-2xl font-bold font-script text-ink">All Journal Entries</h2>

              {/* Journal Notebook */}
              <PaperTexture 
                className="p-1 mb-12"
                elevation="raised"
                variant="lined"
                rotate={0}
              >
                {/* Left sidebar with line decoration */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-paper-dark hidden md:block"></div>
                
                {/* Post list */}
                <div className="divide-y divide-paper-dark">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 md:pl-16 transition-colors hover:bg-paper"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-xl font-bold font-script text-ink">{post.title}</h3>
                          <div className="text-sm font-hand text-ink-light">{post.date}</div>
                        </div>
                        <div className="mb-3 inline-block px-2 py-0.5 text-xs font-hand bg-paper-dark text-ink-light rounded-full capitalize">
                          {post.category}
                        </div>
                        <p className="mb-4 font-hand text-ink-light">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span 
                                key={i} 
                                className="text-xs font-hand text-ink-light"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && <span className="text-xs font-hand text-ink-light">+{post.tags.length - 2} more</span>}
                          </div>
                          <HandDrawnButton href={`/blog/post-${post.id}`} variant="outline" size="sm">
                            Continue Reading
                          </HandDrawnButton>
                        </div>
                        
                        {/* Hand-drawn divider - only for non-last items */}
                        {index < filteredPosts.length - 1 && (
                          <div className="mt-6">
                            <HandDrawnPath
                              path={decorativePaths.underline}
                              strokeWidth={1}
                              strokeColor="#999"
                              width={120}
                              height={20}
                              className="opacity-50"
                              draw={false}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <HandDrawnPath
                        path={decorativePaths.corner}
                        width={40}
                        height={40}
                        strokeWidth={2}
                        strokeColor="#555"
                        className="mx-auto mb-4 transform rotate-45"
                      />
                      <h3 className="mb-2 text-xl font-bold font-script text-ink">No posts found</h3>
                      <p className="mb-4 font-hand text-ink-light">
                        No posts match your current filters. Try a different search or category.
                      </p>
                      <HandDrawnButton 
                        onClick={() => {
                          setActiveCategory('all');
                          setSearchQuery('');
                        }} 
                        variant="outline"
                      >
                        Reset Filters
                      </HandDrawnButton>
                    </div>
                  )}
                </div>
              </PaperTexture>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="px-4 py-24 bg-paper sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PaperTexture 
              className="max-w-3xl mx-auto p-8 py-12" 
              elevation="floating" 
              variant="default" 
              rotate={-0.5}
            >
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 text-3xl font-bold font-script text-ink"
                >
                  Subscribe to My Journal
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8 font-hand text-ink-light"
                >
                  Get notified when I publish new articles, tutorials, and creative explorations.
                </motion.p>

                <form className="max-w-md mx-auto">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 font-hand bg-paper-light border-2 border-dashed border-pencil focus:border-ink focus:outline-none rounded-md"
                      required
                    />
                    <HandDrawnButton type="submit" variant="accent">
                      Subscribe
                    </HandDrawnButton>
                  </div>
                  <p className="mt-3 text-sm font-hand text-ink-light">
                    I respect your privacy. No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </PaperTexture>
          </div>
        </section>
      </div>
    </Layout>
  );
} 