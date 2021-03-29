import styled from "styled-components";
import { FlexColCenterCenter, FlexRowCenterCenter } from "Theme/containers";
import { Logo } from "Theme/misc";

export const ChatPageWrapper = styled(FlexRowCenterCenter)`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.tertiaryDarkGrey};
`;

export const SideBarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const NavBar = styled(FlexColCenterCenter)`
  justify-content: unset;
  width: 72px;
  background-color: ${(props) => props.theme.tertiaryDarkGrey};
  padding: 12px;
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
export const StyledLogo = styled(Logo)`
  height: 100%;
  width: 100%;
`;

export const Home = styled(FlexColCenterCenter)`
  height: 48px;
  width: 48px;
  color: #fff;
  background-color: ${(props) => props.theme.messaging.primaryBlue};
  border-radius: 15px;
  padding: 5px;
`;
