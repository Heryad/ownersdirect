'use client';

import { motion } from 'framer-motion';
import { Send, ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: t('footer.links.about'), href: '/about' },
      { name: t('footer.links.contact'), href: '/#contact' },
    ],
    properties: [
      { name: t('footer.links.buy'), href: '/properties?type=sell' },
      { name: t('footer.links.rent'), href: '/properties?type=rent' },
      { name: t('footer.links.list'), href: '/properties/create' },
    ],
    legal: [
      { name: t('footer.links.privacy'), href: '/legal' },
      { name: t('footer.links.terms'), href: '/legal' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-blue-900/50"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/logo.jpeg"
                    alt="OwnersDirect Logo"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-2xl font-bold">
                    Owners<span className="text-indigo-400">Direct</span>
                  </span>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {t('footer.description')}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
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
              <h4 className="font-bold text-lg mb-4">{t('footer.company')}</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
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
              <h4 className="font-bold text-lg mb-4">{t('footer.properties')}</h4>
              <ul className="space-y-3">
                {footerLinks.properties.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors inline-block hover:translate-x-1 rtl:hover:-translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mb-12"
          >
            <h4 className="font-semibold mb-3 text-center">{t('footer.subscribe')}</h4>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5 rtl:rotate-180" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} OwnersDirect. {t('footer.rights')}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/legal" className="text-slate-400 hover:text-white transition-colors">
                {t('footer.links.privacy')}
              </Link>
              <Link href="/legal" className="text-slate-400 hover:text-white transition-colors">
                {t('footer.links.terms')}
              </Link>
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
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all z-50 rtl:right-auto rtl:left-8"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;
