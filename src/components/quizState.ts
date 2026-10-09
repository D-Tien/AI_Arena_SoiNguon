import type { QuizQuestion } from '../data/quizQuestions';

export type QuizState = {
    questions: QuizQuestion[];
    isStarted: boolean;
    isFinished: boolean;
    currentQuestionIndex: number;
    selectedAnswer: number | null;
    answered: boolean;
    score: number;
    xp: number;
};

export const initialQuizState: QuizState = {
    questions: [], isStarted: false, isFinished: false,
    currentQuestionIndex: 0, selectedAnswer: null, answered: false, score: 0, xp: 0,
};

type QuizAction =
    | { type: 'start'; questions?: QuizQuestion[] }
    | { type: 'answer'; questionId: number; answer: number }
    | { type: 'next'; questionId: number };

export function shuffleQuestions(questions: QuizQuestion[] = [], random = Math.random): QuizQuestion[] {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
    if (action.type === 'start') {
        return { ...initialQuizState, questions: action.questions ?? [], isStarted: true };
    }
    const question = state.questions[state.currentQuestionIndex];
    // Associate events with their question so queued clicks cannot affect the next one.
    if (!state.isStarted || state.isFinished || !question || question.id !== action.questionId) return state;
    if (action.type === 'answer') {
        if (state.answered || !Number.isInteger(action.answer) || action.answer < 0 || action.answer >= question.options.length) return state;
        const correct = action.answer === question.correctAnswer;
        return { ...state, selectedAnswer: action.answer, answered: true,
            score: state.score + (correct ? 1 : 0), xp: state.xp + (correct ? question.xp : 0) };
    }
    if (!state.answered) return state;
    if (state.currentQuestionIndex === state.questions.length - 1) return { ...state, isFinished: true };
    return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, selectedAnswer: null, answered: false };
}
