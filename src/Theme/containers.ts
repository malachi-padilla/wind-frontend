import styled from 'styled-components';

export const FlexRowCenterCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FlexColCenterCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const FlexColCenterStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const FlexRowCenterStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FlexRowCenterEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FlexRowCenterBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const FlexRowCenterEvenly = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
  background-color: ${(props) => props.theme.mainGrey};
  position: relative;
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;

export const FriendBarTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  min-height: 40px;
  border-radius: 4px;
  padding-left: 12px;
  height: unset;
  background-color: ${(props) => props.theme.mainGrey};
  color: ${(props) => props.theme.fontColors.defaultWhite};
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  :hover {
    background-color: #3c3f47;
  }
`;

export const ModalContainer = styled(FlexColCenterCenter)`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
`;

export const InputBox = styled(FlexColCenterCenter)`
  justify-content: flex-start;
  width: 400px;
  max-height: 250px;
  background-color: ${(props) => props.theme.mainGrey};
  color: ${(props) => props.theme.messaging.secondaryGrey};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2rem;
  position: relative;
`;
