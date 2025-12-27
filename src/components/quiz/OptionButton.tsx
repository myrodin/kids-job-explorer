import { motion } from 'framer-motion';

interface OptionButtonProps {
  text: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionButton({
  text,
  emoji,
  selected,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`
        w-full p-4 rounded-2xl border-2 transition-all duration-200
        flex items-center gap-4 text-left
        ${selected
          ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100'
          : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-primary-50/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="text-3xl">{emoji}</span>
      <span className={`text-lg font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>
        {text}
      </span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto"
        >
          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

export default OptionButton;
