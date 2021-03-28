import styled, { keyframes } from "styled-components";
import { FlexColCenterCenter, FlexRowCenterCenter } from "Theme/Containers";

export const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const LogoContainer = styled(FlexColCenterCenter)`
  width: unset;
  height: unset;
  border-radius: 2rem;
  background-color: ${(props) => props.theme.messaging.primaryBlue};
  padding: 5px;
  animation: ${bounce} 1500ms ease infinite;
`;

export const LoadingContainer = styled(FlexRowCenterCenter)`
  width: auto;
  height: auto;
  gap: 10px;
  margin-top: 50px;
`;
