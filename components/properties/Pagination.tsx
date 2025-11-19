'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* First Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-lg transition-all ${
          currentPage === 1
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 shadow-sm'
        }`}
      >
        <ChevronsLeft className="w-5 h-5" />
      </motion.button>

      {/* Previous Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-lg transition-all ${
          currentPage === 1
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 shadow-sm'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <div key={`ellipsis-${index}`} className="px-4 py-2.5 text-slate-400">
              ...
            </div>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <motion.button
            key={pageNum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[44px] px-4 py-2.5 rounded-lg font-semibold transition-all ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 shadow-sm'
            }`}
          >
            {pageNum}
          </motion.button>
        );
      })}

      {/* Next Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 shadow-sm'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Last Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 shadow-sm'
        }`}
      >
        <ChevronsRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Pagination;
