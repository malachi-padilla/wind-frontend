import { createStore } from 'redux';
import {
  RECENTLY_MESSAGED,
  RECIPIENT_IS_TYPING,
  SET_FRIEND,
  POP_OVER_MESSAGE,
} from './actions';
import { ReduxStore } from './types';

const initialState: ReduxStore = {
  friend: '',
  recentlyMessaged: [],
  recipientIsTyping: false,
  popOverMessage: '',
};

export function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_FRIEND: {
      return { ...state, friend: action.payload };
    }
    case RECENTLY_MESSAGED: {
      return { ...state, recentlyMessaged: action.payload };
    }
    case RECIPIENT_IS_TYPING: {
      return { ...state, recipientIsTyping: action.payload };
    }
    case POP_OVER_MESSAGE: {
      return { ...state, popOverMessage: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default createStore(mainReducer);
