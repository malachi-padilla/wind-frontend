import styled from "styled-components";
import { FlexColCenterCenter, MainContainer } from "Theme/containers";
import { Logo } from "Theme/misc";

export const StyledMainContainer = styled(MainContainer)`
  @media only screen and (min-width: 1025px) {
    background: linear-gradient(
      to right,
      ${(props) => props.theme.messaging.primaryBlue},
      #1b1b1b
    );
  }
`;

export const StyledLogo = styled(Logo)`
  top: 0;
  margin-top: 10px;
  position: absolute;
`;

export const FormContainer = styled(FlexColCenterCenter)`
  width: 90%;
  height: unset;
  background-color: ${(props) => props.theme.mainGrey};
  color: ${(props) => props.theme.messaging.secondaryGrey};
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
  @media only screen and (min-width: 1025px) {
    width: 784px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const FormTitle = styled(FlexColCenterCenter)`
  height: unset;
  width: unset;
  h1 {
    color: ${(props) => props.theme.fontColors.defaultWhite};
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
  h3 {
    color: ${(props) => props.theme.messaging.secondaryGrey};
    font-size: 16px;
    line-height: 20px;
  }
`;

export const FormInputs = styled.div`
  margin-top: 20px;
  label {
    font-weight: 600;
    font-size: 12px;
  }
`;

export const LoginInput = styled.input<{ error: boolean }>`
  background-color: ${(props) => props.theme.inputBackground};
  width: 100%;
  height: 40px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 3px;
  border: ${(props) => props.theme.inputBorder};
  border-color: ${(props) =>
    props.error ? props.theme.fontColors.importantRed : null};
  margin-top: 8px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.fontColors.offWhite};
  font-size: 16px;
  :hover {
    transition: ease-in 200ms;
    border: 1px solid #1b1b1b;
  }
  :focus {
    border: 1px solid ${(props) => props.theme.messaging.primaryBlue};
  }
`;

export const FormBtns = styled.div`
  margin-top: 20px;
  button {
    height: 40px;
    width: 100%;
    margin-bottom: 8px;
    background-color: ${(props) => props.theme.messaging.primaryBlue};
    outline: none;
    border: none;
    color: ${(props) => props.theme.fontColors.defaultWhite};
    border-radius: 3px;
    font-size: 16px;
    &:hover {
      transition: ease-in 200ms;
      opacity: 0.9;
    }
  }
`;
