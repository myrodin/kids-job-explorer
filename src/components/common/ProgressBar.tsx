import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'accent';
}

const colors = {
  primary: 'from-primary-400 to-primary-600',
  secondary: 'from-secondary-400 to-secondary-600',
  accent: 'from-accent-400 to-accent-500',
};

export function ProgressBar({
  current,
  total,
  showLabel = true,
  color = 'primary',
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
          <span>진행률</span>
          <span>{current} / {total}</span>
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
