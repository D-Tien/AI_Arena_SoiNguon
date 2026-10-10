export interface ConversationMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface AdvisorRequest {
  question: string;
  history: ConversationMessage[];
}

export const ADVISOR_ERROR_MESSAGE = 'Hiện mình chưa thể xử lý câu hỏi này. Bạn thử lại sau nhé.';
export const HISTORY_LIMIT = 6;
