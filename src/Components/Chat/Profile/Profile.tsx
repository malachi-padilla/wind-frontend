import { ProfileProps } from "Components/Types/props";
import React, { useContext } from "react";
import { MyContext } from "Context";
import { UserContextNotNull } from "Types/types";
import {
  ProfilePageWrapper,
  Sidebar,
  ProfileBody,
  SettingsWrapper,
  SettingsBar,
  Heading,
  EscapeBtn,
  ButtonContainer,
  Title,
  ContentWrapper,
  InfoBox,
  EscapeBar,
  EscapeBarContents,
  InfoWrapper,
  AvatarBar,
  InfoCard,
  InfoBar,
  ProfileImg,
  UserInfoWrapper,
  ImageLabel,
  EditBtn,
  UserInformation,
  LogoutBtn,
} from "./Profile-css";
import { Actions, MoreBtn } from "../Friends/Friends-css";
import { logoutRequest } from "Api/user";

export default function Profile({ setProfileOpen }: ProfileProps) {
  const { user } = useContext(MyContext) as UserContextNotNull;

  const logout = () => {
    logoutRequest().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <ProfilePageWrapper>
      <Sidebar>
        <SettingsWrapper>
          <Heading style={{ marginLeft: "10px" }}>user settings</Heading>
          <SettingsBar>
            <p>My Account</p>
          </SettingsBar>
          <LogoutBtn onClick={logout}>Log Out</LogoutBtn>
        </SettingsWrapper>
      </Sidebar>
      <ProfileBody>
        <ContentWrapper>
          <InfoWrapper>
            <Title>My Account</Title>
            <InfoBox>
              <AvatarBar>
                <UserInfoWrapper>
                  <ProfileImg
                    src="https://source.unsplash.com/random"
                    alt="profilepic"
                  ></ProfileImg>
                  <ImageLabel>
                    <i className="far fa-images"></i>
                  </ImageLabel>
                  <h3>{user.username}</h3>
                </UserInfoWrapper>
                <Actions>
                  <MoreBtn>
                    <i
                      style={{ transform: "rotate(-90deg)", fontSize: "16px" }}
                      className="fas fa-ellipsis-v"
                    ></i>
                  </MoreBtn>
                </Actions>
              </AvatarBar>
              <InfoCard>
                <InfoBar>
                  <UserInformation>
                    <Heading>username</Heading>
                    <p>{user.username}</p>
                  </UserInformation>
                  <Actions>
                    <EditBtn>Edit</EditBtn>
                  </Actions>
                </InfoBar>
              </InfoCard>
            </InfoBox>
          </InfoWrapper>
        </ContentWrapper>
      </ProfileBody>
      <EscapeBar>
        <EscapeBarContents>
          <ButtonContainer>
            <EscapeBtn
              onKeyDown={(e) =>
                e.key === "Escape" ? setProfileOpen(false) : null
              }
              onClick={() => setProfileOpen(false)}
            >
              <i className="fas fa-times"></i>
            </EscapeBtn>
            <p>ESC</p>
          </ButtonContainer>
        </EscapeBarContents>
      </EscapeBar>
    </ProfilePageWrapper>
  );
}
