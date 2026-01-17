import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../context/QuizContext';
import { QuestionCard, QuizProgress } from '../components/quiz';
import { Card, Icon, SEO } from '../components/common';

export function QuizPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';
  const {
    state,
    currentQuestion,
    questions,
    answerQuestion,
    goToNext,
    goToPrev,
    getAnswerForQuestion,
  } = useQuiz();

  // Redirect to results when complete
  useEffect(() => {
    if (state.isComplete) {
      navigate('/result');
    }
  }, [state.isComplete, navigate]);

  if (!currentQuestion) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="text-center">
          <div className="flex items-center gap-3 justify-center">
            <Icon name="star" spin className="text-primary-500" />
            <p className="text-xl text-gray-600">{t('pages:quiz.loading')}</p>
          </div>
        </Card>
      </div>
    );
  }

  const existingAnswer = getAnswerForQuestion(currentQuestion.id);

  return (
    <>
      <SEO
        title={isKorean ? '직업 적성 테스트' : 'Career Aptitude Test'}
        description={isKorean
          ? '18개의 재미있는 질문에 답하고 나에게 맞는 직업을 찾아보세요. 어린이를 위한 무료 적성 검사입니다.'
          : 'Answer 18 fun questions to find your ideal career. Free aptitude test for kids.'}
        keywords={isKorean
          ? '직업 테스트, 적성 검사, 진로 탐색, 어린이 테스트'
          : 'career test, aptitude test, career exploration, kids test'}
        url="/quiz"
        noindex={true}
      />
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center space-y-8">
      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <QuizProgress
          current={state.currentQuestionIndex + 1}
          total={questions.length}
          phase={state.phase}
        />
      </motion.div>

      {/* Question Card */}
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl" padding="lg">
        <QuestionCard
          question={currentQuestion}
          onAnswer={answerQuestion}
          onNext={goToNext}
          onPrev={goToPrev}
          canGoBack={state.currentQuestionIndex > 0}
          existingAnswer={existingAnswer?.selectedOptionIds}
        />
      </Card>

      {/* Fun Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <EncouragementMessage current={state.currentQuestionIndex} total={questions.length} />
        </p>
      </motion.div>
    </div>
    </>
  );
}

function EncouragementMessage({ current, total }: { current: number; total: number }) {
  const { t } = useTranslation();
  const progress = current / total;

  if (progress < 0.25) {
    return (
      <>
        <Icon name="rocket" className="text-secondary-400" />
        {t('pages:quiz.encouragement.start')}
      </>
    );
  } else if (progress < 0.5) {
    return (
      <>
        <Icon name="dumbbell" className="text-primary-400" />
        {t('pages:quiz.encouragement.quarter')}
      </>
    );
  } else if (progress < 0.75) {
    return (
      <>
        <Icon name="star" className="text-accent-400" />
        {t('pages:quiz.encouragement.half')}
      </>
    );
  } else {
    return (
      <>
        <Icon name="trophy" className="text-accent-500" />
        {t('pages:quiz.encouragement.almostDone')}
      </>
    );
  }
}

export default QuizPage;
