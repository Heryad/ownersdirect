'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Verification Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Logo */}
          <Link href="/" className="block mb-8">
            <h1 className="text-2xl font-bold text-center">
              <span className="text-slate-900">Owners</span>
              <span className="text-indigo-600">Direct</span>
            </h1>
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex p-6 bg-indigo-100 rounded-full mb-6"
          >
            <Mail className="w-16 h-16 text-indigo-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h2>
          <p className="text-slate-600 mb-8">
            We've sent a verification link to your email address. Please click the link to verify your account.
          </p>

          <div className="space-y-4">
            <Link href="/auth/signin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Back to Sign In
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">
              Didn't receive the email?{' '}
              <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700">
                Check your spam folder
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
