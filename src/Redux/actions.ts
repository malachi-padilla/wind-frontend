import { createAction } from "redux-actions";

export const SET_FRIEND = "SET_FRIEND";

export const setFriendAction = createAction<string>(SET_FRIEND);
