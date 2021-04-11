import styled from "styled-components";
import { PrimaryButton } from "Theme/buttons";
import { InputBox } from "Theme/containers";

export const ModalBox = styled(InputBox)`
  height: 200px;
  width: 440px;
`;
export const LogoutBtn = styled(PrimaryButton)`
  height: 38px;
  background-color: ${(props) => props.theme.fontColors.importantRed};
  color: ${(props) => props.theme.fontColors.defaultWhite};
`;
