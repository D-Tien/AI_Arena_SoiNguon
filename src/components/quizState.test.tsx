import { describe, expect, it } from 'vitest';
import { StrictMode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Explore } from './Explore';
import { quizQuestions } from '../data/quizQuestions';
import { initialQuizState, quizReducer, shuffleQuestions } from './quizState';

const start = () => quizReducer(initialQuizState, { type: 'start', questions: quizQuestions });

describe('Quiz A–G', () => {
    it('A: renders the start button and zero XP, including Strict Mode', () => {
        const html = renderToStaticMarkup(<StrictMode><Explore /></StrictMode>);
        expect(html).toContain('BẮT ĐẦU CHƠI');
        expect(html).toContain('aria-label="0 XP"');
        expect(initialQuizState).toMatchObject({ isStarted: false, isFinished: false, score: 0, xp: 0, answered: false, selectedAnswer: null });
    });
    it('B: starts at question 1 of 15', () => {
        expect(start()).toMatchObject({ isStarted: true, isFinished: false, currentQuestionIndex: 0, questions: quizQuestions });
        expect(start().questions).toHaveLength(15);
    });
    it('C: awards 10 XP once, ignoring duplicate and changed answers', () => {
        const action = { type: 'answer' as const, questionId: quizQuestions[0].id, answer: quizQuestions[0].correctAnswer };
        const answered = quizReducer(start(), action);
        expect(answered).toMatchObject({ score: 1, xp: 10, answered: true, selectedAnswer: action.answer });
        expect(quizReducer(answered, action)).toBe(answered);
        expect(quizReducer(answered, { ...action, answer: (action.answer + 1) % 4 })).toBe(answered);
    });
    it('D: records a wrong answer without XP and retains the correct answer and explanation', () => {
        const wrong = (quizQuestions[0].correctAnswer + 1) % 4;
        const answered = quizReducer(start(), { type: 'answer', questionId: quizQuestions[0].id, answer: wrong });
        expect(answered).toMatchObject({ score: 0, xp: 0, answered: true, selectedAnswer: wrong });
        expect(answered.questions[0].correctAnswer).toBe(quizQuestions[0].correctAnswer);
        expect(answered.questions[0].explanation).toBeTruthy();
    });
    it('E: advances exactly once and clears selection without resetting points', () => {
        const started = start();
        const next = { type: 'next' as const, questionId: quizQuestions[0].id };
        expect(quizReducer(started, next)).toBe(started);
        const answered = quizReducer(started, { type: 'answer', questionId: next.questionId, answer: quizQuestions[0].correctAnswer });
        const advanced = quizReducer(answered, next);
        expect(advanced).toMatchObject({ currentQuestionIndex: 1, selectedAnswer: null, answered: false, score: 1, xp: 10 });
        expect(quizReducer(advanced, next)).toBe(advanced);
        expect(quizReducer(advanced, { type: 'answer', questionId: next.questionId, answer: 0 })).toBe(advanced);
    });
    it.each([0, 9, 12, 15])('F: finishes all 15 questions with %i correct answers', correctCount => {
        let state = start();
        quizQuestions.forEach((question, index) => {
            const answer = index < correctCount ? question.correctAnswer : (question.correctAnswer + 1) % 4;
            state = quizReducer(state, { type: 'answer', questionId: question.id, answer });
            expect(state.currentQuestionIndex).toBe(index);
            state = quizReducer(state, { type: 'next', questionId: question.id });
        });
        expect(state).toMatchObject({ isFinished: true, currentQuestionIndex: 14, score: correctCount, xp: correctCount * 10 });
        expect(quizReducer(state, { type: 'next', questionId: 15 })).toBe(state);
        expect(quizReducer(state, { type: 'answer', questionId: 15, answer: 0 })).toBe(state);
    });
    it('G: restarts with a fresh shuffle and resets every round field', () => {
        let state = start();
        for (const question of quizQuestions) {
            state = quizReducer(state, { type: 'answer', questionId: question.id, answer: question.correctAnswer });
            state = quizReducer(state, { type: 'next', questionId: question.id });
        }
        const shuffled = shuffleQuestions(quizQuestions, () => 0);
        const restarted = quizReducer(state, { type: 'start', questions: shuffled });
        expect(restarted).toEqual({ ...initialQuizState, isStarted: true, questions: shuffled });
        expect(shuffled.map(q => q.id)).not.toEqual(quizQuestions.map(q => q.id));
        expect(shuffled.map(q => q.id).sort((a, b) => a - b)).toEqual(quizQuestions.map(q => q.id));
        expect(quizQuestions[0].id).toBe(1);
        for (const question of shuffled) expect(question).toEqual(quizQuestions.find(q => q.id === question.id));
        expect(start()).toMatchObject({ xp: 0, score: 0, isFinished: false });
    });
});

describe('Quiz guards and fixed data', () => {
    it('contains 15 unique questions with four options, one valid answer and 10 XP', () => {
        expect(quizQuestions).toHaveLength(15);
        expect(new Set(quizQuestions.map(q => q.id)).size).toBe(15);
        for (const question of quizQuestions) {
            expect(question.options).toHaveLength(4);
            expect(new Set(question.options).size).toBe(4);
            expect(Number.isInteger(question.correctAnswer)).toBe(true);
            expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(question.correctAnswer).toBeLessThan(4);
            expect(question.explanation).toBeTruthy();
            expect(question.xp).toBe(10);
        }
        expect(new Set(quizQuestions.map(q => q.correctAnswer)).size).toBe(4);
    });
    it('handles undefined/empty data and indices outside the array', () => {
        expect(shuffleQuestions()).toEqual([]);
        const empty = quizReducer(initialQuizState, { type: 'start' });
        for (const state of [initialQuizState, empty, { ...start(), currentQuestionIndex: 15 }]) {
            expect(quizReducer(state, { type: 'answer', questionId: 1, answer: 0 })).toBe(state);
            expect(quizReducer(state, { type: 'next', questionId: 1 })).toBe(state);
        }
    });
    it('ignores invalid options and is pure under repeated reducer execution', () => {
        const state = start();
        for (const answer of [-1, 4, 0.5, NaN]) expect(quizReducer(state, { type: 'answer', questionId: 1, answer })).toBe(state);
        const action = { type: 'answer' as const, questionId: 1, answer: quizQuestions[0].correctAnswer };
        expect(quizReducer(state, action)).toEqual(quizReducer(state, action));
        expect(state.xp).toBe(0);
    });
});
