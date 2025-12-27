import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { QuestionCard, QuizProgress } from '../components/quiz';
import { Card, Icon } from '../components/common';

export function QuizPage() {
  const navigate = useNavigate();
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
            <p className="text-xl text-gray-600">질문을 불러오는 중...</p>
          </div>
        </Card>
      </div>
    );
  }

  const existingAnswer = getAnswerForQuestion(currentQuestion.id);

  return (
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
          {getEncouragement(state.currentQuestionIndex, questions.length)}
        </p>
      </motion.div>
    </div>
  );
}

function getEncouragement(current: number, total: number): React.ReactNode {
  const progress = current / total;

  if (progress < 0.25) {
    return (
      <>
        <Icon name="rocket" className="text-secondary-400" />
        좋은 시작이야! 계속 가보자
      </>
    );
  } else if (progress < 0.5) {
    return (
      <>
        <Icon name="dumbbell" className="text-primary-400" />
        잘하고 있어! 벌써 반 가까이 왔어
      </>
    );
  } else if (progress < 0.75) {
    return (
      <>
        <Icon name="star" className="text-accent-400" />
        대단해! 조금만 더 힘내자
      </>
    );
  } else {
    return (
      <>
        <Icon name="trophy" className="text-accent-500" />
        거의 다 왔어! 마지막까지 파이팅!
      </>
    );
  }
}

export default QuizPage;
