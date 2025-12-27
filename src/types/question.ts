export type QuestionPhase = 'warmup' | 'personality' | 'specific';
export type QuestionType = 'single' | 'multiple' | 'scale';

export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
  scores: Record<string, number>;
}

export interface Question {
  id: string;
  phase: QuestionPhase;
  type: QuestionType;
  text: string;
  emoji: string;
  options: QuestionOption[];
  maxSelections?: number;
  condition?: {
    tag: string;
    minScore: number;
  };
}

export interface Answer {
  questionId: string;
  selectedOptionIds: string[];
  scaleValue?: number;
}

export interface UserScores {
  [tag: string]: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Answer[];
  scores: UserScores;
  phase: QuestionPhase;
  isComplete: boolean;
  resultSaved: boolean;
}
