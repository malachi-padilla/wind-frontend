import { createAction } from "redux-actions";

export const SET_FRIEND = "SET_FRIEND";
export const RECENTLY_MESSAGED = "RECENTLY_MESSAGED";
export const RECIPIENT_IS_TYPING = "RECIPIENT_IS_TYPING";

export const setFriendAction = createAction<string>(SET_FRIEND);
export const setRecentlyMessagedAction = createAction<string[]>(
  RECENTLY_MESSAGED
);
export const setRecipientIsTypingAction = createAction<boolean>(
  RECIPIENT_IS_TYPING
);
