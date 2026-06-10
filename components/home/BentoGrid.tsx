"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { EvidenceCard } from './EvidenceCard';

interface BentoGridProp {
  children: React.ReactNode[];
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any
    }
  }
};

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const BentoGrid: React.FC<BentoGridProp> = ({ children }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)] w-full"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => {
        let colSpan = "col-span-1";
        let rowSpan = "row-span-1";

        if (index === 0) {
          colSpan = "md:col-span-2";
          rowSpan = "md:row-span-2";
        } else if (index === 1 || index === 2) {
          colSpan = "md:col-span-1";
          rowSpan = "md:row-span-2";
        } else {
          colSpan = "md:col-span-1";
          rowSpan = "md:row-span-1";
        }

        return (
          <motion.div
            variants={ITEM_VARIANTS}
            className={`${colSpan} ${rowSpan} relative group`}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
