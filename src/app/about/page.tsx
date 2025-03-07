'use client';

import { motion } from 'framer-motion';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnPath from '@/components/ui/HandDrawnPath';
import Layout from '@/components/layout/Layout';
import HandDrawnButton from '@/components/ui/HandDrawnButton';

export default function About() {
  // Skills array
  const skills = [
    { name: 'Web Design', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Frontend Development', level: 80 },
    { name: 'Illustration', level: 75 },
    { name: 'Animation', level: 70 },
    { name: 'Backend Development', level: 65 },
  ];

  // Timeline items
  const timeline = [
    {
      year: '2023',
      title: 'Computer Science Studies',
      description: 'Currently studying computer science with a focus on web development and programming.'
    },
    {
      year: '21-23',
      title: 'SVI at FFSM Marrakech',
      description: 'Studied Science of Life (SVI) at Faculty of Sciences and Technology in Marrakech.'
    },
    {
      year: '2021',
      title: 'Baccalaureate in Physics and Chemistry',
      description: 'Graduated from high school with a specialization in physics and chemistry.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-paper-light">
        {/* Hero Section */}
        <section className="px-4 pt-12 pb-24 sm:px-6 md:pt-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-ink font-script">
                About Me
              </h1>
              <p className="mx-auto max-w-2xl text-xl font-hand text-ink-light">
                I&apos;m a passionate web developer and designer with a love for creating beautiful, 
                hand-crafted digital experiences. Born and raised with a creative spirit, I&apos;ve always 
                been drawn to the intersection of technology and art.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <PaperTexture className="p-6 md:p-8" elevation="raised" rotate={1}>
                  <div className="mb-6">
                    <h2 className="mb-4 text-2xl font-bold text-ink font-script">My Story</h2>
                    <p className="mb-4 font-hand text-ink-light">
                      My journey began with a foundation in physics and chemistry, where I developed a 
                      methodical approach to problem-solving and a fascination with how things work.
                    </p>
                    <p className="mb-4 font-hand text-ink-light">
                      After studying Life Sciences at FFSM in Marrakech, I discovered my true passion 
                      in computer science and web development, where I could blend analytical thinking with creative expression.
                    </p>
                    <p className="font-hand text-ink-light">
                      Today, I'm pursuing computer science with a focus on creating intuitive, beautiful digital 
                      experiences that combine technical precision with artistic design – bringing a unique 
                      perspective shaped by my diverse educational background.
                    </p>
                  </div>
                </PaperTexture>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center justify-center"
              >
                <PaperTexture 
                  className="relative overflow-hidden max-w-md aspect-[4/5] p-4" 
                  elevation="floating" 
                  variant="default" 
                  rotate={-1}
                >
                  <div className="relative w-full h-full bg-paper-light flex flex-col items-center justify-center">
                    {/* Sketch portrait frame */}
                    <div className="relative mb-4">
                      {/* Simple SVG portrait matching user's sketch */}
                      <svg 
                        width="200" 
                        height="220" 
                        viewBox="0 0 200 220" 
                        className="relative z-10"
                      >
                        {/* Face outline */}
                        <motion.path 
                          d="M100,40 C140,40 150,80 150,110 C150,150 125,180 100,180 C75,180 50,150 50,110 C50,80 60,40 100,40 Z" 
                          stroke="#333" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2 }}
                        />
                        
                        {/* Cap/Hat */}
                        <motion.path 
                          d="M70,60 C90,40 110,40 130,60 M65,75 C90,55 110,55 135,75" 
                          stroke="#333" 
                          strokeWidth="2" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 1.5 }}
                        />
                        
                        {/* Left eye */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                        >
                          <circle cx="80" cy="100" r="10" stroke="#333" strokeWidth="1.5" fill="none" />
                          <circle cx="83" cy="97" r="3" fill="#333" />
                        </motion.g>
                        
                        {/* Right eye */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7, duration: 0.5 }}
                        >
                          <circle cx="120" cy="100" r="10" stroke="#333" strokeWidth="1.5" fill="none" />
                          <circle cx="123" cy="97" r="3" fill="#333" />
                        </motion.g>
                        
                        {/* Nose */}
                        <motion.path 
                          d="M100,110 L100,130" 
                          stroke="#333" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.9, duration: 0.7 }}
                        />
                        
                        {/* Smile */}
                        <motion.path 
                          d="M70,145 C85,165 115,165 130,145" 
                          stroke="#333" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 2.1, duration: 1 }}
                        />
                        
                        {/* Neck/Body */}
                        <motion.path 
                          d="M90,180 L90,200 L110,200 L110,180" 
                          stroke="#333" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 2.5, duration: 0.8 }}
                        />
                      </svg>
                    </div>
                    
                    {/* Caption below portrait */}
                    <motion.div 
                      className="text-center mt-2 font-hand text-ink w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.8, duration: 0.8 }}
                    >
                      <div className="border-t border-dashed border-ink-light pt-3 mt-2">
                        <p className="text-sm italic">Hand-drawn with code</p>
                        <p className="text-xs mt-1 mb-2">— Your future is being written in every line of code —</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Close "X" button */}
                  <div className="absolute top-2 right-2">
                    <HandDrawnPath 
                      path="M5,5 L15,15 M5,15 L15,5"
                      width={20}
                      height={20}
                      strokeWidth={2}
                      strokeColor="#333"
                      viewBox="0 0 20 20"
                      className="w-6 h-6"
                    />
                  </div>
                </PaperTexture>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-4 py-24 bg-paper sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-ink font-script">My Skills</h2>
              <p className="mx-auto max-w-2xl font-hand text-ink-light">
                Here are some of the skills I've developed over the years, combining traditional 
                techniques with modern digital tools.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <PaperTexture 
                    className="p-6" 
                    elevation="raised" 
                    variant={index % 2 === 0 ? 'default' : 'dotted'} 
                    rotate={index % 2 === 0 ? 0.5 : -0.5}
                  >
                    <div className="mb-2">
                      <h3 className="text-xl font-bold font-hand text-ink">{skill.name}</h3>
                    </div>
                    <div className="w-full h-6 mb-1 overflow-hidden bg-paper-dark rounded-sm">
                      <motion.div
                        className="h-full bg-ink"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="text-right text-sm font-hand text-ink-light">{skill.level}%</div>
                  </PaperTexture>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-ink font-script">My Journey</h2>
              <p className="mx-auto max-w-2xl font-hand text-ink-light">
                A timeline of my professional experience and education.
              </p>
            </motion.div>

            <PaperTexture className="p-8" elevation="raised" variant="lined" rotate={0}>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-pencil-light md:left-1/2 md:-ml-px" />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="relative"
                    >
                      <div className="grid md:grid-cols-2 md:gap-8">
                        {/* Year marker - always on left on mobile, alternates on desktop */}
                        <div className={`mb-4 flex items-center md:mb-0 ${index % 2 === 0 ? 'md:order-1' : 'md:text-right'}`}>
                          <div className="absolute flex items-center justify-center w-12 h-12 bg-paper border-2 border-ink rounded-full left-0 md:left-1/2 md:-ml-6">
                            <span className="text-lg font-bold font-script text-ink">{item.year}</span>
                          </div>
                          <div className={`ml-16 md:ml-0 ${index % 2 === 1 ? 'md:mr-16' : 'md:ml-16'}`}>
                            <h3 className="text-xl font-bold font-script text-ink">{item.title}</h3>
                            <p className="font-hand text-ink-light">{item.description}</p>
                          </div>
                        </div>
                        
                        {/* For desktop view - empty div to create spacing */}
                        <div className={`hidden md:block ${index % 2 === 1 ? 'md:order-1' : ''}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </PaperTexture>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PaperTexture className="p-8 py-16 text-center" elevation="floating" variant="default" rotate={0.5}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-3xl font-bold text-ink font-script"
              >
                Let's Work Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-2xl mx-auto mb-8 font-hand text-ink-light"
              >
                If you're interested in collaborating on a project or just want to chat, 
                feel free to reach out. I'm always open to new opportunities and challenges.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <HandDrawnButton href="/contact" size="lg" variant="accent" className="text-paper-light">
                  Get In Touch
                </HandDrawnButton>
                <HandDrawnButton href="/portfolio" variant="outline" size="lg">
                  View My Work
                </HandDrawnButton>
              </motion.div>
            </PaperTexture>
          </div>
        </section>

        <div className="mt-8 ml-10 p-6 bg-paper rounded-lg shadow-sm">
          <h3 className="text-xl font-bold font-script text-ink">Philosophy</h3>
          <p className="mt-2 font-hand text-ink-light">
            I believe that great design doesn&apos;t have to be perfect - sometimes the little 
            imperfections make it more human and relatable. That&apos;s why I&apos;ve 
            embraced this hand-drawn aesthetic in my work.
          </p>
        </div>
      </div>
    </Layout>
  );
} 