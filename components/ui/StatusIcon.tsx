"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheckIcon, BadgeAlertIcon, XIcon } from 'lucide-animated';

type StatusType = 'success' | 'warning' | 'error';

interface StatusIconProps {
  type: StatusType;
  size?: number;
  className?: string;
}

interface StatusConfig {
  Icon: React.ElementType;
  colorClass: string;
  glowColor: string;
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  success: {
    Icon: CircleCheckIcon,
    colorClass: 'text-[#00FF9F]',
    glowColor: 'bg-[#00FF9F]',
  },
  warning: {
    Icon: BadgeAlertIcon,
    colorClass: 'text-yellow-400',
    glowColor: 'bg-yellow-400',
  },
  error: {
    Icon: XIcon,
    colorClass: 'text-red-500',
    glowColor: 'bg-red-500',
  },
};

export const StatusIcon = ({ type, size = 16, className = "" }: StatusIconProps) => {
  const { Icon, colorClass, glowColor } = STATUS_CONFIG[type];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 blur-md opacity-40 rounded-full ${glowColor}`}
        style={{ filter: 'blur(4px)' }}
      />

      {/* Animated Icon */}
      <div className={`relative z-10 ${colorClass}`}>
        <Icon size={size} />
      </div>
    </div>
  );
};
