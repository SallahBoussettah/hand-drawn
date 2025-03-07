'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import PaperTexture from '@/components/ui/PaperTexture';
import HandDrawnMap from '@/components/ui/HandDrawnMap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-hand">Get in Touch</h1>
          <p className="mb-2 text-lg font-hand text-ink">
            Let&apos;s chat about your project ideas!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <PaperTexture className="p-6" elevation="floating">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-hand">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent border-2 border-dashed border-ink focus:border-solid focus:outline-none font-hand"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-hand">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent border-2 border-dashed border-ink focus:border-solid focus:outline-none font-hand"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-hand">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 bg-transparent border-2 border-dashed border-ink focus:border-solid focus:outline-none font-hand resize-none"
                      required
                    />
                  </div>
                  
                  <HandDrawnButton type="submit" variant="sketchy" className="w-full">
                    Send Message
                  </HandDrawnButton>
                </form>
              </PaperTexture>
            </motion.div>

            {/* Map and Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Interactive Map */}
              <PaperTexture className="h-64 md:h-80" elevation="floating">
                <HandDrawnMap
                  center={{ lat: 31.6295, lng: -7.9811 }}
                  zoom={13}
                  className="w-full h-full"
                />
              </PaperTexture>

              {/* Contact Information */}
              <PaperTexture className="p-6" elevation="floating">
                <div className="space-y-4 font-hand">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  
                  <div>
                    <p className="font-bold">Address:</p>
                    <p>Rue Yves Saint Laurent</p>
                    <p>Gueliz, Marrakech</p>
                    <p>Morocco</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">Email:</p>
                    <p>hello@example.com</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">Phone:</p>
                    <p>+212 5 XX XX XX XX</p>
                  </div>
                </div>
              </PaperTexture>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 