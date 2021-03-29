import { createStore } from "redux";
import { SET_FRIEND } from "./actions";

const initialState = {
  friend: "",
};

export function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_FRIEND: {
      return { ...state, friend: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default createStore(mainReducer);
