import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Icon } from '../common';

interface QuizProgressProps {
  current: number;
  total: number;
  phase: 'warmup' | 'personality' | 'specific';
}

const phaseStyles = {
  warmup: { color: 'bg-secondary-400', textColor: 'text-secondary-500', icon: 'bullseye' },
  personality: { color: 'bg-primary-500', textColor: 'text-primary-500', icon: 'brain' },
  specific: { color: 'bg-accent-500', textColor: 'text-accent-500', icon: 'star' },
};

export function QuizProgress({ current, total, phase }: QuizProgressProps) {
  const { t } = useTranslation();
  const percentage = (current / total) * 100;
  const { color, textColor, icon } = phaseStyles[phase];
  const label = t(`pages:quiz.phases.${phase}`);

  return (
    <div className="w-full mb-8">
      {/* Phase Badge */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Icon name={icon} className={textColor} />
          <span className={`text-sm font-semibold ${textColor}`}>
            {label}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-500">
          {current} / {total}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Progress Dots */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`
              w-2 h-2 rounded-full
              ${i < current ? color : i === current ? 'bg-gray-400' : 'bg-gray-200'}
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizProgress;
