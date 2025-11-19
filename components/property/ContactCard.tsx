'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Star, Award } from 'lucide-react';

interface ContactCardProps {
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  whatsapp: string;
  rating: number;
  propertiesListed: number;
  verified: boolean;
}

const ContactCard = ({
  name,
  role,
  image,
  phone,
  email,
  whatsapp,
  rating,
  propertiesListed,
  verified,
}: ContactCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi, I am interested in this property listing.');
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Property Inquiry');
    const body = encodeURIComponent('Hi, I am interested in this property listing.');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  <Award className="w-5 h-5 text-indigo-600" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              <p className="text-indigo-100 text-sm mb-2">{role}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{rating}</span>
                </div>
                <span className="text-indigo-200 text-xs">•</span>
                <span className="text-sm">{propertiesListed} listings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 space-y-3">
          {/* Phone */}
          <div className="flex items-center gap-3 text-slate-700">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Phone className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-500">Phone</div>
              <div className="font-semibold">{phone}</div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-slate-700">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Mail className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-500">Email</div>
              <div className="font-semibold text-sm">{email}</div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3 text-slate-700">
            <div className="p-2 bg-slate-100 rounded-lg">
              <MessageCircle className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-500">WhatsApp</div>
              <div className="font-semibold">{whatsapp}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 space-y-3">
          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </motion.button>

          {/* Email Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmail}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </motion.button>

          {/* Call Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCall}
            className="w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </motion.button>
        </div>

        {/* Trust Badge */}
        {verified && (
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center gap-2 text-indigo-700">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">Verified Professional</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                This agent has been verified and trusted by OwersDirect
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactCard;
