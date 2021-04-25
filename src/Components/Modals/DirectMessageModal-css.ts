import styled from 'styled-components';
import {
  FlexColCenterCenter,
  FriendBarTheme,
  InputBox,
  ModalContainer,
} from 'Theme/containers';

export const Container = styled(ModalContainer)`
  background-color: transparent;
  justify-content: flex-start;
`;

export const FriendSelectBox = styled(InputBox)`
  border: 1px solid rgb(0, 0, 0, 0.3);
  max-height: 300px;
  width: 450px;
  margin-left: 600px;
  margin-top: 150px;
  padding: 1rem;
  box-shadow: ${(props) => props.theme.defaultBoxShadow};
`;

export const Title = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  color: ${(props) => props.theme.fontColors.defaultWhite}};
  h2 {
  text-transform: uppercase;
  font-size: 16px;
  }
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  border: 1px solid #1b1b1b;
  background-color: ${(props) => props.theme.tertiaryDarkGrey};
  width: 90%;
  height: 30px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColors.offWhite};
  font-size: 14px;
  font-weight: 500px;
  &:hover {
    transition: ease-in 200ms;
  }
  &:focus {
    border: 1px solid #7289da;
  }
`;

export const FriendsList = styled(FlexColCenterCenter)`
  justify-content: flex-start;
  width: 95%;
`;

export const FriendBar = styled(FriendBarTheme)`
  margin-top: none;
`;
