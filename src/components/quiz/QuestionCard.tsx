import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Question } from '../../types';
import { OptionButton } from './OptionButton';
import { ScaleSlider } from './ScaleSlider';
import { Button, Icon } from '../common';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOptionIds: string[], scaleValue?: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  existingAnswer?: string[];
}

export function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrev,
  canGoBack,
  existingAnswer = [],
}: QuestionCardProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(existingAnswer);
  const [scaleIndex, setScaleIndex] = useState<number | null>(null);
  const prevQuestionId = useRef(question.id);

  // Reset when question changes
  useEffect(() => {
    if (prevQuestionId.current !== question.id) {
      prevQuestionId.current = question.id;
      setSelectedOptions(existingAnswer);
      if (question.type === 'scale' && existingAnswer.length > 0) {
        const index = question.options.findIndex((o) => o.id === existingAnswer[0]);
        setScaleIndex(index >= 0 ? index : null);
      } else {
        setScaleIndex(null);
      }
    }
  }, [question.id, question.type, question.options, existingAnswer]);

  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      setSelectedOptions([optionId]);
    } else if (question.type === 'multiple') {
      const maxSelections = question.maxSelections || 2;
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else if (selectedOptions.length < maxSelections) {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const handleScaleSelect = (index: number) => {
    setScaleIndex(index);
    setSelectedOptions([question.options[index].id]);
  };

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions, scaleIndex ?? undefined);
      onNext();
    }
  };

  const isValid = selectedOptions.length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {/* Question */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="text-6xl mb-4"
          >
            {question.emoji}
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            {question.text}
          </h2>
          {question.type === 'multiple' && question.maxSelections && (
            <p className="mt-2 text-gray-500 flex items-center justify-center gap-2">
              <Icon name="info-circle" size="sm" />
              {t('pages:quiz.maxSelections', { count: question.maxSelections })}
              <span className="ml-2 text-primary-500 font-medium">
                ({selectedOptions.length}/{question.maxSelections})
              </span>
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.type === 'scale' ? (
            <ScaleSlider
              options={question.options}
              selectedIndex={scaleIndex}
              onSelect={handleScaleSelect}
            />
          ) : (
            question.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <OptionButton
                  text={option.text}
                  emoji={option.emoji}
                  selected={selectedOptions.includes(option.id)}
                  onClick={() => handleOptionClick(option.id)}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {canGoBack && (
            <Button variant="outline" onClick={onPrev} className="flex-1">
              <Icon name="chevron-left" size="sm" />
              {t('common:buttons.prev')}
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isValid}
            fullWidth={!canGoBack}
            className="flex-1"
          >
            {t('common:buttons.next')}
            <Icon name="chevron-right" size="sm" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionCard;
