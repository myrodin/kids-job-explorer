import { createContext, useContext, useReducer, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Question, Answer, UserScores, QuizState } from '../types';
import questionsData from '../data/questions.json';

const baseQuestions = questionsData as Question[];

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'MARK_RESULT_SAVED' };

interface QuizContextType {
  state: QuizState;
  currentQuestion: Question | null;
  questions: Question[];
  dispatch: React.Dispatch<QuizAction>;
  answerQuestion: (selectedOptionIds: string[], scaleValue?: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  resetQuiz: () => void;
  markResultSaved: () => void;
  getAnswerForQuestion: (questionId: string) => Answer | undefined;
}

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  scores: {},
  phase: 'warmup',
  isComplete: false,
  resultSaved: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...initialState };

    case 'ANSWER_QUESTION': {
      const { payload } = action;
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === payload.questionId
      );

      let newAnswers: Answer[];
      if (existingAnswerIndex >= 0) {
        newAnswers = [...state.answers];
        newAnswers[existingAnswerIndex] = payload;
      } else {
        newAnswers = [...state.answers, payload];
      }

      // Calculate scores from the answer
      const currentQuestion = baseQuestions.find((q) => q.id === payload.questionId);
      let newScores = { ...state.scores };

      if (currentQuestion) {
        payload.selectedOptionIds.forEach((optionId) => {
          const option = currentQuestion.options.find((o) => o.id === optionId);
          if (option) {
            Object.entries(option.scores).forEach(([tag, score]) => {
              newScores[tag] = (newScores[tag] || 0) + score;
            });
          }
        });
      }

      return {
        ...state,
        answers: newAnswers,
        scores: newScores,
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;

      // Filter questions based on conditions (using base questions for structure)
      const availableQuestions = getAvailableQuestionsBase(state.scores);

      if (nextIndex >= availableQuestions.length) {
        return { ...state, isComplete: true };
      }

      const nextQuestion = availableQuestions[nextIndex];
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        phase: nextQuestion.phase,
      };
    }

    case 'PREV_QUESTION': {
      if (state.currentQuestionIndex <= 0) return state;
      const prevIndex = state.currentQuestionIndex - 1;
      const prevQuestion = baseQuestions[prevIndex];
      return {
        ...state,
        currentQuestionIndex: prevIndex,
        phase: prevQuestion.phase,
      };
    }

    case 'COMPLETE_QUIZ':
      return { ...state, isComplete: true };

    case 'RESET_QUIZ':
      return { ...initialState };

    case 'MARK_RESULT_SAVED':
      return { ...state, resultSaved: true };

    default:
      return state;
  }
}

// Used inside reducer (no translation needed, just structure)
function getAvailableQuestionsBase(scores: UserScores): Question[] {
  return baseQuestions.filter((question) => {
    if (!question.condition) return true;
    const { tag, minScore } = question.condition;
    return (scores[tag] || 0) >= minScore;
  });
}

// Used in provider (with translations)
function getAvailableQuestions(scores: UserScores, translatedQuestions: Question[]): Question[] {
  return translatedQuestions.filter((question) => {
    if (!question.condition) return true;
    const { tag, minScore } = question.condition;
    return (scores[tag] || 0) >= minScore;
  });
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { t } = useTranslation('questions');

  // Translate questions based on current language
  const translatedQuestions = useMemo(() => {
    return baseQuestions.map((q) => ({
      ...q,
      text: t(`${q.id}.text`, { defaultValue: q.text }),
      options: q.options.map((opt) => ({
        ...opt,
        text: t(`${q.id}.options.${opt.id}`, { defaultValue: opt.text }),
      })),
    }));
  }, [t]);

  const availableQuestions = getAvailableQuestions(state.scores, translatedQuestions);
  const currentQuestion = availableQuestions[state.currentQuestionIndex] || null;

  const answerQuestion = (selectedOptionIds: string[], scaleValue?: number) => {
    if (!currentQuestion) return;

    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: currentQuestion.id,
        selectedOptionIds,
        scaleValue,
      },
    });
  };

  const goToNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const goToPrev = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const markResultSaved = () => {
    dispatch({ type: 'MARK_RESULT_SAVED' });
  };

  const getAnswerForQuestion = (questionId: string) => {
    return state.answers.find((a) => a.questionId === questionId);
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        currentQuestion,
        questions: availableQuestions,
        dispatch,
        answerQuestion,
        goToNext,
        goToPrev,
        resetQuiz,
        markResultSaved,
        getAnswerForQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
