import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Explore } from './Explore';
import { quizQuestions } from '../data/quizQuestions';
import { initialQuizState, quizReducer, type QuizState } from './quizState';

const override = vi.hoisted(() => ({ state: null as QuizState | null }));
vi.mock('react', async importOriginal => {
    const actual = await importOriginal<typeof import('react')>();
    return { ...actual, useReducer: (...args: Parameters<typeof actual.useReducer>) => {
        if (override.state && args[0] === quizReducer) return [override.state, vi.fn()];
        return actual.useReducer(...args);
    } };
});
afterEach(() => { override.state = null; });

function render(state: QuizState) {
    override.state = state;
    return renderToStaticMarkup(<Explore onExplore={() => {}} />);
}
const start = () => quizReducer(initialQuizState, { type: 'start', questions: quizQuestions });

describe('Quiz rendered states', () => {
    it('renders question 1/15 and progress, with no next button before an answer', () => {
        const html = render(start());
        expect(html).toContain('CÂU 1 / 15');
        expect(html).toContain(quizQuestions[0].question);
        expect(html).toContain('aria-valuenow="1"');
        expect(html).not.toContain('CÂU TIẾP THEO');
        expect(html).not.toContain(quizQuestions[0].explanation);
    });
    it.each([true, false])('shows answer feedback and explanation (correct: %s)', correct => {
        const question = quizQuestions[0];
        const state = quizReducer(start(), { type: 'answer', questionId: question.id, answer: correct ? question.correctAnswer : (question.correctAnswer + 1) % 4 });
        const html = render(state);
        expect(html).toContain('Đúng');
        expect(html.includes('> Sai')).toBe(!correct);
        expect(html).toContain(question.explanation);
        expect(html).toContain('CÂU TIẾP THEO');
        expect(html).toContain(`aria-label="${correct ? 10 : 0} XP"`);
        expect((html.match(/disabled="" aria-pressed/g) ?? []).length).toBe(4);
    });
    it('renders the next question with cleared selection and the last question with results action', () => {
        const question = quizQuestions[0];
        const answered = quizReducer(start(), { type: 'answer', questionId: question.id, answer: question.correctAnswer });
        const next = quizReducer(answered, { type: 'next', questionId: question.id });
        expect(render(next)).toContain('CÂU 2 / 15');
        expect(render(next)).not.toContain('aria-pressed="true"');
        const html = render({ ...answered, currentQuestionIndex: 14 });
        expect(html).toContain('CÂU 15 / 15');
        expect(html).toContain('aria-valuenow="15"');
        expect(html).toContain('XEM KẾT QUẢ');
    });
    it.each([
        [12, '80%', 'Bạn am hiểu Việt phục ghê đó!'],
        [9, '60%', 'Kiến thức khá tốt, thử thêm vài câu nữa nhé!'],
        [0, '0%', 'Khởi đầu ổn rồi, khám phá thêm Việt phục nhé!'],
    ] as const)('renders results for %i correct answers', (score, percent, message) => {
        const html = render({ ...start(), isFinished: true, score, xp: score * 10 });
        for (const text of ['Kết quả thử thách', `${score} / 15`, percent, message, 'CHƠI LẠI', 'KHÁM PHÁ VIỆT PHỤC']) expect(html).toContain(text);
    });
    it('renders a recovery state for empty questions or an invalid index', () => {
        for (const state of [{ ...start(), questions: [] }, { ...start(), currentQuestionIndex: 15 }]) {
            const html = render(state);
            expect(html).toContain('Chưa có câu hỏi để hiển thị.');
            expect(html).toContain('THỬ LẠI');
            expect(html).not.toContain('NaN');
        }
    });
});
