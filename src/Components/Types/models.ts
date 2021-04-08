export interface SocketPrivateChatMessage {
  message: string;
  sentBy: string;
}

export interface SocketIsTypingMessage {
  personTyping: string;
  isTyping: boolean;
}
