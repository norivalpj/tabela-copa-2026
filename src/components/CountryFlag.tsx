import React from 'react';
import { motion } from 'motion/react';

export function CountryFlag({ code, className }: { code: string, className?: string }) {
  if (!code || code === '🏳️') return <span className="text-xl">🏳️</span>;
  return (
    <motion.img 
      src={`https://flagcdn.com/w40/${code}.png`} 
      alt={code.toUpperCase()} 
      referrerPolicy="no-referrer"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`w-5 h-3.5 object-cover rounded-[2px] shadow-sm inline-block object-center ${className || ''}`} 
    />
  );
}
