import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "Theme/buttons";
import { FlexRowCenterEnd } from "Theme/containers";

export const FormFooter = styled(FlexRowCenterEnd)`
  height: 20%;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.secondaryDarkGrey};
  position: absolute;
  bottom: 0;
`;
export const ExitBtn = styled(SecondaryButton)`
  align-self: flex-end;
  background: none;
  position: absolute;
  top: 10px;
  right: -14px;
  font-size: 20px;
  color: ${(props) => props.theme.fontColors.defaultMediumGrey};
  :hover {
    transition: ease-in 200ms;
    color: ${(props) => props.theme.fontColors.defaultWhite};
  }
`;
export const CancelBtn = styled(SecondaryButton)`
  background: none;
  color: ${(props) => props.theme.fontColors.defaultWhite};
  :hover {
    text-decoration: underline ${(props) => props.theme.fontColors.defaultWhite};
  }
`;
export const DoneBtn = styled(PrimaryButton)`
  height: 38px;
  background-color: ${(props) => props.theme.messaging.primaryBlue};
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;
