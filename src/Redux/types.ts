export interface ReduxStore {
  friend: string;
  recentlyMessaged: { username: string; profilePicture: string }[];
  recipientIsTyping: boolean;
  popOverMessage: string;
}
