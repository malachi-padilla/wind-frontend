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
  height: fit-content;
  width: fit-content;
  padding: 10px;
  background-color: ${(props) => props.theme.defaultBlack};
  color: ${(props) => props.theme.fontColors.defaultWhite};
  position: absolute;
  border-radius: 4px;
  font-size: 11px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
`;
