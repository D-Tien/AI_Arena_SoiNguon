import { describe, expect, it } from 'vitest';
import { prepareAdvisorContext, type ConversationMessage } from './advisorContext';
import { buildAdvisorPrompt } from './systemPrompt';

describe('Advisor intent and retrieval', () => {
  it.each(['đi chơi mặc gì', 'hôm nay nên mặc gì', 'đi chơi phố cổ mặc gì'])('%s stays general without selecting a garment', question => {
    const context = prepareAdvisorContext(question);
    expect(context.intent).toBe('GENERAL_OUTFIT_ADVICE');
    expect(context.retrievedGarments).toEqual([]);
    expect(context.culturalContext).toBe('');
    expect(context.guardContext).toBe('');
    expect(buildAdvisorPrompt(context).systemInstruction).toContain('hỏi 1 câu ngắn');
    expect(buildAdvisorPrompt(context).systemInstruction).not.toContain('Ngũ Thân');
  });

  it.each(['đi chơi phố cổ mặc trang phục truyền thống gì', 'đi chơi mặc Việt phục gì', 'đi tết mặc áo gì truyền thống', 'các loại áo truyền thống Việt Nam'])('%s retrieves options, without choosing one for the user', question => {
    const context = prepareAdvisorContext(question);
    expect(context.intent).toBe('TRADITIONAL_OUTFIT_ADVICE');
    expect(context.retrievedGarments).toEqual(expect.arrayContaining(['ao_dai', 'ao_tu_than', 'ao_ngu_than']));
    expect(context.retrievedGarments).toHaveLength(5);
  });

  it.each(['áo ngũ thân ra đời từ bao giờ', 'áo ngũ thân là gì', 'Nhật Bình có nguồn gốc từ đâu'])('%s requests garment facts', question => {
    const context = prepareAdvisorContext(question);
    expect(context.intent).toBe('GARMENT_INFO');
    expect(context.retrievedGarments).toHaveLength(1);
    expect(context.guardContext).toBe('');
    expect(context.culturalContext).toContain('sources');
  });

  it.each(['sneaker phối áo dài được không', 'sneaker phối Nhật Bình được không'])('%s gets compatibility and guard context', question => {
    const context = prepareAdvisorContext(question);
    expect(context.intent).toBe('COMPATIBILITY');
    expect(context.retrievedGarments).toHaveLength(1);
    expect(context.guardContext).toContain('keepRule');
    expect(context.guardContext).toContain('remixSafety');
  });

  it('F: why follows the compatibility decision and includes the previous answer', () => {
    const history: ConversationMessage[] = [
      { role: 'user', text: 'sneaker phối áo dài được không' },
      { role: 'assistant', text: 'Có thể khi đi chơi, tùy bối cảnh.' },
    ];
    const context = prepareAdvisorContext('tại sao', history);
    expect(context.intent).toBe('FOLLOW_UP');
    expect(context.resolvedIntent).toBe('COMPATIBILITY');
    expect(context.retrievedGarments).toEqual(['ao_dai']);
    expect(context.guardContext).not.toBe('');
    expect(buildAdvisorPrompt(context).messages).toEqual([...history, { role: 'user', text: 'tại sao' }]);
  });

  it('uses a location reply as outfit context without inventing a garment', () => {
    const context = prepareAdvisorContext('phố cổ', [
      { role: 'user', text: 'đi chơi mặc gì' },
      { role: 'assistant', text: 'Bạn đi đâu và muốn phong cách nào?' },
    ]);
    expect(context.intent).toBe('FOLLOW_UP');
    expect(context.resolvedIntent).toBe('GENERAL_OUTFIT_ADVICE');
    expect(context.conversationContext).toBe('đi chơi mặc gì');
    expect(context.retrievedGarments).toEqual([]);
  });

  it('does not let an old garment pollute a new question or its follow-up', () => {
    const history: ConversationMessage[] = [
      { role: 'user', text: 'sneaker phối Nhật Bình được không' },
      { role: 'assistant', text: 'Cần cân nhắc bối cảnh.' },
    ];
    expect(prepareAdvisorContext('đi chơi mặc gì', history).retrievedGarments).toEqual([]);
    expect(prepareAdvisorContext('độ mixi là ai', history).retrievedGarments).toEqual([]);
    expect(prepareAdvisorContext('tại sao', [...history,
      { role: 'user', text: '1 năm có bao nhiêu ngày' },
      { role: 'assistant', text: 'Thông thường là 365 ngày.' },
    ]).retrievedGarments).toEqual([]);
  });

  it('keeps the newest explicitly named garment in follow-ups', () => {
    const context = prepareAdvisorContext('màu nào hợp', [
      { role: 'user', text: 'sneaker phối Nhật Bình được không' },
      { role: 'assistant', text: 'Cần cân nhắc bối cảnh.' },
      { role: 'user', text: 'thế còn áo dài' },
      { role: 'assistant', text: 'Áo dài có thể phối sneaker.' },
    ]);
    expect(context.retrievedGarments).toEqual(['ao_dai']);
  });

  it('does not retrieve garments from an assistant suggestion the user has not chosen', () => {
    const context = prepareAdvisorContext('tại sao', [
      { role: 'user', text: 'đi chơi mặc gì' },
      { role: 'assistant', text: 'Có thể thử áo ngũ thân nếu muốn Việt phục.' },
    ]);
    expect(context.retrievedGarments).toEqual([]);
  });

  it('does not treat unrelated traditions as garment advice', () => {
    expect(prepareAdvisorContext('truyền thống đón năm mới là gì').culturalContext).toBe('');
  });

  it('passes explicit event and style to existing Cultural Guard rules', () => {
    const context = prepareAdvisorContext('đi chùa phối áo ngũ thân kiểu Y2K được không');
    expect(context.intent).toBe('COMPATIBILITY');
    const guard = JSON.parse(context.guardContext);
    expect(guard[0].eventRule.level).toBe('red');
    expect(guard[0].eventRule.block).toBe(false);
  });

  it('limits history to six messages and places the current question last', () => {
    const history: ConversationMessage[] = Array.from({ length: 10 }, (_, index) => ({
      role: index % 2 === 0 ? 'user' : 'assistant', text: `Tin nhắn ${index}`,
    }));
    const context = prepareAdvisorContext('đi chơi mặc gì', history);
    const prompt = buildAdvisorPrompt(context);
    expect(context.history).toEqual(history.slice(-6));
    expect(prompt.messages.at(-1)?.text).toBe('đi chơi mặc gì');
    expect(prompt.messages).toHaveLength(7);
    const headings = ['CURRENT INTENT', 'CURRENT CONVERSATION CONTEXT', 'CULTURAL CONTEXT', 'CULTURAL GUARD'];
    const positions = headings.map(heading => prompt.systemInstruction.indexOf(heading));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
