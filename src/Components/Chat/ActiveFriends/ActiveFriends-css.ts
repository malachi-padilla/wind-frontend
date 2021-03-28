import styled from "styled-components";
import { FlexColCenterCenter, FlexColCenterStart } from "Theme/Containers";

export const MainContainer = styled(FlexColCenterCenter)`
  width: 20%;
  background-color: ${(props) => props.theme.darkTheme.secondaryDarkGrey};
  color: ${(props) => props.theme.darkTheme.fontColors.defaultLightGrey};
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const Subheading = styled.h4`
  color: ${(props) => props.theme.darkTheme.fontColors.defaultWhite};
  margin-bottom: "10px";
`;

export const Text = styled.p`
  color: ${(props) => props.theme.darkTheme.fontColors.defaultMediumGrey};
`;

export const Title = styled.div`
  display: flex;
  margin-top: 90px;
  font-size: 12px;
  margin-bottom: 40px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const ActiveUsersContainer = styled(FlexColCenterStart)`
  width: 90%;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const LonelyWrapper = styled(FlexColCenterCenter)`
  height: fit-content;
  padding: 20px;
  background-color: ${(props) => props.theme.darkTheme.mainGrey};
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const ActiveUsersList = styled.div``;
export const ActiveUser = styled.div``;
