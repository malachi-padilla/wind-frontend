import React from "react";

export interface ReduxStore {
  friend: string;
  recentlyMessaged: string[];
  recipientIsTyping: boolean;
}
