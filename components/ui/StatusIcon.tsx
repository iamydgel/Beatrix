"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, LucideIcon } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error';

interface StatusIconProps {
  type: StatusType;
  size?: number;
  className?: string;
}

interface StatusConfig {
  Icon: LucideIcon;
  colorClass: string;
  glowColor: string;
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  success: {
    Icon: CheckCircle2,
    colorClass: 'text-[#00FF9F]',
    glowColor: 'bg-[#00FF9F]',
  },
  warning: {
    Icon: AlertCircle,
    colorClass: 'text-yellow-400',
    glowColor: 'bg-yellow-400',
  },
  error: {
    Icon: XCircle,
    colorClass: 'text-red-500',
    glowColor: 'bg-red-500',
  },
};

export const StatusIcon = ({ type, size = 16, className = "" }: StatusIconProps) => {
  const { Icon, colorClass, glowColor } = STATUS_CONFIG[type];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 blur-md opacity-40 rounded-full ${glowColor}`}
        style={{ filter: 'blur(4px)' }}
      />

      {/* Animated Icon */}
      <motion.div
        whileHover={{
          scale: 1.2,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        className={`relative z-10 ${colorClass}`}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Icon size={size} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
