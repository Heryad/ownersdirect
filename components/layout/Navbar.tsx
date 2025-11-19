'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2, User, LogIn } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setIsLoggedIn(true);
          // Fetch profile for avatar
          const { data: profile } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();

          if (profile) {
            setUserAvatar(profile.avatar_url);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkUser();
  }, []);

  const navLinks = [
    { name: 'Buy', href: '/properties' },
    { name: 'Sell', href: '/properties' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Building2 className="w-8 h-8 text-indigo-600" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Owners<span className="text-indigo-600">Direct</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button & Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300"
                >
                  Dashboard
                </motion.button>
              </Link>
            )}

            <Link href="/properties/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300"
              >
                List Property
              </motion.button>
            </Link>

            {isLoggedIn ? (
              <Link href="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer shadow-lg overflow-hidden"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </motion.div>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-200 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-slate-700 font-medium hover:text-indigo-600 transition-colors py-2"
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}

              {isLoggedIn && (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium"
                  >
                    Dashboard
                  </motion.button>
                </Link>
              )}

              <Link href="/properties/create" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + (isLoggedIn ? 1 : 0)) * 0.1 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium shadow-lg"
                >
                  List Property
                </motion.button>
              </Link>

              {isLoggedIn ? (
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </motion.button>
                </Link>
              ) : (
                <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
