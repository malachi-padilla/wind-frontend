import styled, { keyframes } from "styled-components";
import { FlexRowCenterCenter } from "Theme/Containers";

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

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background-color: #7289da;
  padding: 5px;
  animation: ${bounce} 1500ms ease infinite;
`;

export const LoadingContainer = styled(FlexRowCenterCenter)`
  width: auto;
  height: auto;
  gap: 10px;
  margin-top: 50px;
`;
