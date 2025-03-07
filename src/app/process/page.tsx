'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnPath from '@/components/ui/HandDrawnPath';

export default function Process() {
  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: 'Discovery',
      description: 'Getting to know your project goals, audience, and vision through in-depth consultation.',
      icon: 'M12,5 C7.58,5 4,8.58 4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 M12,9 L12,13 L16,13',
      details: [
        'Initial consultation to understand project scope',
        'Research and analysis of competitors',
        'Target audience definition',
        'Project goals and objectives establishment',
        'Timeline and milestone planning'
      ]
    },
    {
      id: 2,
      title: 'Strategy',
      description: 'Creating a roadmap that aligns creative direction with business objectives.',
      icon: 'M3,3 L21,3 L21,21 L3,21 L3,3 M8,11 L16,11 M8,16 L13,16 M14,6 L17,9 L14,12',
      details: [
        'Creative brief development',
        'Content strategy planning',
        'User experience mapping',
        'Technical requirements definition',
        'Project scope finalization'
      ]
    },
    {
      id: 3,
      title: 'Design',
      description: 'Crafting visual concepts that bring your ideas to life with a hand-drawn aesthetic.',
      icon: 'M4,5 L20,5 M4,12 L20,12 M4,19 L20,19 M7,8 C8.66,8 10,6.66 10,5 C10,6.66 11.34,8 13,8 C11.34,8 10,9.34 10,11 C10,9.34 8.66,8 7,8 Z M15,22 C16.66,22 18,20.66 18,19 C18,20.66 19.34,22 21,22 C19.34,22 18,23.34 18,25 C18,23.34 16.66,22 15,22 Z',
      details: [
        'Mood board development',
        'Sketching and conceptualization',
        'Visual design exploration',
        'Style guide creation',
        'Interactive prototyping'
      ]
    },
    {
      id: 4,
      title: 'Development',
      description: 'Building the technical foundation with attention to performance and interactivity.',
      icon: 'M8,3 L8,9 L3,14 L8,14 L8,21 L13,16 L18,21 L18,3 M3,3 L21,3 M3,21 L21,21',
      details: [
        'Front-end development with hand-drawn elements',
        'Animation implementation',
        'Responsive design adaptation',
        'Backend integration if required',
        'Performance optimization'
      ]
    },
    {
      id: 5,
      title: 'Review',
      description: 'Testing and refining to ensure the project meets all requirements and expectations.',
      icon: 'M9,5 L9,19 M5,9 L9,5 L13,9 M15,19 L15,5 M11,15 L15,19 L19,15',
      details: [
        'Quality assurance testing',
        'Cross-browser compatibility checking',
        'Client feedback implementation',
        'User testing and adjustments',
        'Final refinements and polish'
      ]
    },
    {
      id: 6,
      title: 'Launch',
      description: 'Bringing your project to life and ensuring a smooth transition to the public.',
      icon: 'M12,21 L12,3 M5,10 L12,3 L19,10 M3,21 L21,21',
      details: [
        'Deployment preparation',
        'Launch day coordination',
        'Analytics setup',
        'Documentation handover',
        'Post-launch support'
      ]
    }
  ];

  // Services data
  const services = [
    {
      title: 'Web Design',
      description: 'Creative websites with hand-drawn elements and engaging animations',
      icon: 'M3,3 L21,3 L21,21 L3,21 L3,3 M3,9 L21,9 M9,21 L9,9'
    },
    {
      title: 'Branding',
      description: 'Distinctive brand identities with a personal, handcrafted touch',
      icon: 'M12,12 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 M12,12 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0'
    },
    {
      title: 'Illustration',
      description: 'Custom illustrations and visual storytelling for any medium',
      icon: 'M4,4 C6,8 10,8 12,4 C14,8 18,8 20,4 L20,20 C18,16 14,16 12,20 C10,16 6,16 4,20 L4,4'
    },
    {
      title: 'UI/UX Design',
      description: 'Intuitive user experiences with charming visual details',
      icon: 'M12,5 L12,19 M5,12 L19,12 M3,7 C3,4.8 4.8,3 7,3 L17,3 C19.2,3 21,4.8 21,7 L21,17 C21,19.2 19.2,21 17,21 L7,21 C4.8,21 3,19.2 3,17 L3,7 Z'
    }
  ];

  // Reference for animated sections
  const stepsRef = useRef(null);
  const servicesRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.1 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });

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
                My Process
              </h1>
              <p className="mx-auto max-w-2xl text-xl font-hand text-ink-light">
                How I transform ideas into creative, hand-crafted digital experiences
              </p>
            </motion.div>

            <div className="mb-16">
              <PaperTexture className="p-6 md:p-8" elevation="raised" variant="lined" rotate={0.5}>
                <div className="max-w-3xl mx-auto">
                  <h2 className="mb-6 text-2xl font-bold text-center text-ink font-script">
                    Every Great Project Starts With A Sketch
                  </h2>
                  <p className="mb-4 font-hand text-ink-light">
                    I believe that the best digital experiences maintain a human touch. My process embraces 
                    both traditional artistry and modern technology, resulting in projects that feel 
                    personal, thoughtful, and unique.
                  </p>
                  <p className="font-hand text-ink-light">
                    From initial concept sketches to the final polished product, I approach each project with 
                    creativity, attention to detail, and a focus on creating meaningful connections with users.
                  </p>
                </div>
              </PaperTexture>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section 
          ref={stepsRef}
          className="px-4 py-24 bg-paper sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-ink font-script">Creative Workflow</h2>
              <p className="mx-auto max-w-2xl font-hand text-ink-light">
                My six-step approach ensures each project is thoughtfully crafted from concept to completion
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pencil hidden md:block md:left-1/2 md:-ml-px" />

              <div className="space-y-12 relative">
                {processSteps.map((step, index) => (
                  <div key={step.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={stepsInView ? 
                        { opacity: 1, y: 0 } : 
                        { opacity: 0, y: 30 }
                      }
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.2 
                      }}
                      className="relative"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Step Content - Alternating Layout */}
                        <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                          <PaperTexture 
                            className="p-6" 
                            elevation="floating" 
                            variant={index % 2 === 0 ? 'default' : 'dotted'} 
                            rotate={index % 2 === 0 ? 0.5 : -0.5}
                          >
                            <div className="md:hidden mb-4 flex items-center">
                              <div className="flex items-center justify-center w-16 h-16 bg-paper rounded-full border-2 border-ink">
                                <HandDrawnPath 
                                  path={step.icon}
                                  width={24}
                                  height={24}
                                  strokeWidth={2}
                                  strokeColor="#333"
                                  viewBox="0 0 24 24"
                                />
                              </div>
                              <div className="ml-4">
                                <h3 className="text-2xl font-bold font-script text-ink">
                                  {step.title}
                                </h3>
                                <span className="text-sm font-hand text-ink-light">
                                  Step {step.id}
                                </span>
                              </div>
                            </div>

                            <div className="hidden md:block mb-4">
                              <h3 className="text-2xl font-bold font-script text-ink">
                                {step.title}
                              </h3>
                              <span className="text-sm font-hand text-ink-light">
                                Step {step.id}
                              </span>
                            </div>
                            
                            <p className="mb-6 font-hand text-ink-light">
                              {step.description}
                            </p>
                            
                            <ul className="space-y-2">
                              {step.details.map((detail, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={stepsInView ? 
                                    { opacity: 1, x: 0 } : 
                                    { opacity: 0, x: -10 }
                                  }
                                  transition={{ 
                                    duration: 0.4, 
                                    delay: index * 0.2 + i * 0.1 + 0.3
                                  }}
                                  className="flex items-start font-hand text-ink-light"
                                >
                                  <span className="inline-block w-5 h-5 mr-2 text-ink">
                                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </span>
                                  {detail}
                                </motion.li>
                              ))}
                            </ul>
                          </PaperTexture>
                        </div>
                        
                        {/* Step Icon - Only visible on desktop */}
                        <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-start md:pl-12' : 'justify-end md:pr-12'}`}>
                          <div className="relative">
                            <div className="absolute flex items-center justify-center w-16 h-16 bg-paper border-2 border-ink rounded-full left-0 top-0 md:left-auto md:right-auto md:top-auto md:relative">
                              <HandDrawnPath 
                                path={step.icon}
                                width={24}
                                height={24}
                                strokeWidth={2}
                                strokeColor="#333"
                                viewBox="0 0 24 24"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          ref={servicesRef}
          className="px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-ink font-script">Services</h2>
              <p className="mx-auto max-w-2xl font-hand text-ink-light">
                Creative solutions that blend artistry with functionality
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? 
                    { opacity: 1, y: 0 } : 
                    { opacity: 0, y: 30 }
                  }
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15 
                  }}
                >
                  <PaperTexture 
                    className="p-6 text-center h-full" 
                    elevation="raised" 
                    rotate={Math.random() * 1.5 - 0.75}
                  >
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-2 border-dashed border-ink rounded-full">
                      <HandDrawnPath 
                        path={service.icon}
                        width={28}
                        height={28}
                        strokeWidth={2}
                        strokeColor="#333"
                        viewBox="0 0 24 24"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-bold font-script text-ink">{service.title}</h3>
                    <p className="mb-4 font-hand text-ink-light">{service.description}</p>
                  </PaperTexture>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-24 bg-paper sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-ink font-script">Client Experiences</h2>
              <p className="mx-auto max-w-2xl font-hand text-ink-light">
                Hear what others have to say about working with me
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote: "The hand-drawn elements and animations brought our brand to life in a way we never imagined possible. Absolutely delighted with the result!",
                  author: "Sarah Johnson",
                  role: "Creative Director",
                  company: "Artisan Studio"
                },
                {
                  quote: "Working together was a seamless experience. The attention to detail and creative approach made our website stand out from the competition.",
                  author: "Michael Chen",
                  role: "Founder",
                  company: "Innovative Startups"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 
                  }}
                >
                  <PaperTexture 
                    className="p-6" 
                    elevation="floating" 
                    variant="lined" 
                    rotate={index === 0 ? 0.5 : -0.5}
                  >
                    <svg className="w-10 h-10 mb-4 text-ink-light" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="mb-4 text-lg italic font-hand text-ink-light">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <span className="block font-bold font-script text-ink">{testimonial.author}</span>
                      <span className="block font-hand text-ink-light">{testimonial.role}, {testimonial.company}</span>
                    </div>
                  </PaperTexture>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PaperTexture className="p-8 py-16 mx-auto text-center" elevation="floating" rotate={0}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-3xl font-bold text-ink font-script"
              >
                Start Your Creative Journey
              </motion.h2>
              <blockquote className="ml-5 pl-6 italic border-l-4 border-ink/20 my-8 font-hand text-ink-light">
                &ldquo;Design is the silent ambassador of your brand.&rdquo; - Paul Rand
              </blockquote>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-2xl mx-auto mb-8 text-lg font-hand text-ink-light"
              >
                Ready to bring your ideas to life with a hand-crafted approach? Let&apos;s work together to create 
                something unique and memorable.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <HandDrawnButton href="/contact" size="lg" variant="accent" className="text-paper-light">
                  Start a Project
                </HandDrawnButton>
                <HandDrawnButton href="/portfolio" variant="outline" size="lg">
                  View My Work
                </HandDrawnButton>
              </motion.div>
            </PaperTexture>
          </div>
        </section>
      </div>
    </Layout>
  );
} 