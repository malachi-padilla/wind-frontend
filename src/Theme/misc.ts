import styled from 'styled-components';
import WindLogo from 'Assets/WindLogo/logo_2.png';
import { FlexColCenterCenter } from './containers';

export const Logo = styled.div`
  height: 100px;
  width: 100px;
  background-image: url(${WindLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ProfilePicture = styled.img`
  height: 35px;
  width: 35px;
  object-position: center;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
  position: relative;
`;

export const DefaultInput = styled.input`
  background-color: ${(props) => props.theme.inputBackground};
  width: 100%;
  height: 40px;
  padding: 10px;
  outline: none;
  box-sizing: border-box;
  border-radius: 3px;
  border: ${(props) => props.theme.inputBorder};
  margin-top: 8px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.fontColors.offWhite};
  font-size: 16px;
  :hover {
    border-color: #222;
  }
  :focus {
    border: 1px solid ${(props) => props.theme.messaging.primaryBlue};
  }
  ::placeholder {
    color: ${(props) => props.theme.fontColors.offWhite};
  }
`;

export const DefaultPopOver = styled(FlexColCenterCenter)`
  height: 30px;
  width: 100px;
  padding: 8px;
  background-color: ${(props) => props.theme.defaultBlack};
  color: ${(props) => props.theme.fontColors.defaultWhite};
  position: absolute;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  font-weight: 200;
`;
export const DefaultStatusIndicator = styled.div<{
  online: boolean;
  appLocation: string;
}>`
  position: absolute;
  bottom: 7px;
  left: 35px;
  span {
    height: 10px;
    width: 10px;
    float: left;
    margin-right: 10px;
    background-color: ${(props) =>
      props.online
        ? props.theme.fontColors.actionGreen
        : props.theme.messaging.secondaryGrey};
    display: block;
    border-radius: 50%;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.appLocation === 'SideBar'
          ? props.theme.secondaryDarkGrey
          : props.appLocation === 'Profile'
          ? '#292b2f'
          : props.theme.mainGrey};
  }
`;
