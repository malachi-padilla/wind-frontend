import { createAction } from "redux-actions";

export const SET_FRIEND = "SET_FRIEND";
export const RECENTLY_MESSAGED = "RECENTLY_MESSAGED";
export const RECIPIENT_IS_TYPING = "RECIPIENT_IS_TYPING";
export const POP_OVER_MESSAGE = "POP_OVER_MESSAGE";

export const setFriendAction = createAction<string>(SET_FRIEND);
export const setPopOverMessage = createAction<string>(POP_OVER_MESSAGE);
export const setRecentlyMessagedAction = createAction<
  { username: string; profilePicture: string }[]
>(RECENTLY_MESSAGED);
export const setRecipientIsTypingAction = createAction<boolean>(
  RECIPIENT_IS_TYPING
);
