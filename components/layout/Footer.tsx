'use client';

import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    properties: [
      { name: 'Buy Property', href: '/properties' },
      { name: 'Rent Property', href: '/properties' },
      { name: 'Commercial', href: '/properties' },
      { name: 'List Property', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '/#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-blue-900/50"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-8 h-8 text-indigo-400" />
                  <span className="text-2xl font-bold">
                    Owers<span className="text-indigo-400">Direct</span>
                  </span>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Your trusted partner in finding the perfect property. We connect owners directly
                  with buyers and renters, making real estate simple and transparent.
                </p>

                {/* Newsletter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-300"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                      aria-label={social}
                    >
                      <span className="text-xs font-bold">{social[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Properties Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-4">Properties</h4>
              <ul className="space-y-3">
                {footerLinks.properties.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/10 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/20 rounded-lg">
                <Phone className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Call Us</div>
                <div className="font-semibold">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Email Us</div>
                <div className="font-semibold">hello@owersdirect.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-600/20 rounded-lg">
                <MapPin className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Visit Us</div>
                <div className="font-semibold">123 Real Estate Ave, LA</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} OwersDirect. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;
