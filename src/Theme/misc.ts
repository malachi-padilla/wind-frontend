import styled from "styled-components";
import WindLogo from "Assets/WindLogo/logo_2.png";

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
`;
