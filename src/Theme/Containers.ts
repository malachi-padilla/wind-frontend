import styled from "styled-components";

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

export const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
  background-color: ${(props) => props.theme.darkTheme.mainGrey};
  position: relative;
  color: ${(props) => props.theme.darkTheme.fontColors.defaultWhite};
`;
