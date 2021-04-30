import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxStore } from 'Redux/types';
import { PopOverContainer } from './PopOver-css';

export default function PopOver() {
  const popOverMessage = useSelector(
    (state: ReduxStore) => state.popOverMessage
  );
  return (
    <PopOverContainer message={popOverMessage}>
      {popOverMessage}
    </PopOverContainer>
  );
}
