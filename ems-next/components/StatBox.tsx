import React from 'react';
import { motion } from 'framer-motion';

interface StatBoxProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export default function StatBox({ title, count, icon, color, bg }: StatBoxProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className={`p-4 rounded-2xl ${bg} ${color} shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
        <p className="text-3xl font-black text-gray-900 mt-0.5 tabular-nums">{count}</p>
      </div>
    </motion.div>
  );
}
