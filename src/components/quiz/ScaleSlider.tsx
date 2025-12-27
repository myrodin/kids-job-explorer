import { motion } from 'framer-motion';

interface ScaleOption {
  id: string;
  text: string;
  emoji: string;
}

interface ScaleSliderProps {
  options: ScaleOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ScaleSlider({ options, selectedIndex, onSelect }: ScaleSliderProps) {
  return (
    <div className="w-full">
      {/* Labels */}
      <div className="flex justify-between mb-4 px-2">
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <span>{options[0]?.emoji}</span>
          <span>{options[0]?.text}</span>
        </span>
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
          <span>{options[options.length - 1]?.text}</span>
          <span>{options[options.length - 1]?.emoji}</span>
        </span>
      </div>

      {/* Scale Buttons */}
      <div className="flex justify-between gap-2">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => onSelect(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              flex-1 aspect-square rounded-full flex items-center justify-center
              transition-all duration-200 text-2xl
              ${selectedIndex === index
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-300 scale-110'
                : 'bg-gray-100 hover:bg-primary-100'
              }
            `}
          >
            {selectedIndex === index && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {option.emoji}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Label */}
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <span className="text-lg font-medium text-primary-600">
            {options[selectedIndex]?.text}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default ScaleSlider;
