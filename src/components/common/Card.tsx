import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
};

export function Card({
  children,
  onClick,
  className = '',
  hover = false,
  selected = false,
  padding = 'md',
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={hover ? { duration: 0.15 } : undefined}
      className={`
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${selected
          ? 'ring-4 ring-primary-400 bg-primary-50'
          : 'bg-white'
        }
        ${hover ? 'hover:shadow-xl' : ''}
        rounded-3xl shadow-lg transition-shadow duration-150
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default Card;
