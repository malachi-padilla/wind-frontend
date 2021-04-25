/* eslint-disable prefer-const */
import { ProfileProps } from 'Components/Types/props';
import React, { useContext, useState } from 'react';
import { MyContext } from 'Context';
import { UserContextNotNull } from 'Types/types';
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
  PhotoUpload,
} from './Profile-css';
import { Actions, MoreBtn } from '../Friends/Friends-css';
import { logoutRequest } from 'Api/user';
import EditModal from 'Components/Modals/EditModal';
import LogoutModal from 'Components/Modals/LogoutModal';
import EditMediaModal from 'Components/Modals/EditMediaModal';
import { API_URL } from 'Config/globalVariables';
import axios from 'axios';
import { hideEmail } from 'Util/utilFunctions';

export default function Profile({ setProfileOpen }: ProfileProps) {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string>('');
  const [editMediaModal, setEditMediaModalOpen] = useState<boolean>(false);
  const [mediaKey, setMediaKey] = useState<any>(false);
  const [infoType, setInfoType] = useState<string>('');

  const logout = () => {
    logoutRequest().then(() => {
      window.location.href = '/';
    });
  };

  const uploadAvatar = () => {
    // formData with a key of "avatar" value of a file, key of userId value of UUID
    const formData = new FormData();
    formData.append('avatar', newAvatar[0]);
    formData.append('userId', user.userId);
    axios
      .post(`${API_URL}/user/uploadProfilePicture`, formData, {
        withCredentials: true,
      })
      .then(() => {
        setFetchNew((current) => !current);
        setEditMediaModalOpen(false);
      });
  };

  return (
    <ProfilePageWrapper>
      {editModalOpen && (
        <EditModal setEditModalOpen={setEditModalOpen} infoType={infoType} />
      )}
      {logoutModalOpen && (
        <LogoutModal logout={logout} open={setLogoutModalOpen} />
      )}
      {editMediaModal && (
        <EditMediaModal
          avatar={newAvatar}
          open={setEditMediaModalOpen}
          setMediaKey={setMediaKey}
          setAvatar={setNewAvatar}
          uploadAvatar={uploadAvatar}
        />
      )}
      <Sidebar>
        <SettingsWrapper>
          <Heading style={{ marginLeft: '10px' }}>user settings</Heading>
          <SettingsBar>
            <p>My Account</p>
          </SettingsBar>
          <LogoutBtn onClick={() => setLogoutModalOpen(true)}>
            Log Out
          </LogoutBtn>
        </SettingsWrapper>
      </Sidebar>
      <ProfileBody>
        <ContentWrapper>
          <InfoWrapper>
            <Title>My Account</Title>
            <InfoBox>
              <AvatarBar>
                <UserInfoWrapper>
                  <ProfileImg image={user.profilePicture}>
                    <ImageLabel>
                      <i className='far fa-images'></i>
                    </ImageLabel>
                    <span>
                      Change Avatar
                      <PhotoUpload
                        accept='image/*'
                        id='photoUpload'
                        key={mediaKey}
                        onChange={(e: any) => {
                          setNewAvatar(e.target.files);
                          setEditMediaModalOpen(true);
                        }}
                        type='file'
                      ></PhotoUpload>
                    </span>
                  </ProfileImg>
                  <h3>{user.username}</h3>
                </UserInfoWrapper>
                <Actions>
                  <MoreBtn>
                    <i
                      style={{ transform: 'rotate(-90deg)', fontSize: '16px' }}
                      className='fas fa-ellipsis-v'
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
                    <EditBtn
                      onClick={() => {
                        setEditModalOpen(true);
                        setInfoType('username');
                      }}
                    >
                      Edit
                    </EditBtn>
                  </Actions>
                </InfoBar>
                <InfoBar>
                  <UserInformation>
                    <Heading>email</Heading>
                    <p
                      style={{ cursor: !user.email ? 'pointer' : undefined }}
                      onClick={() => {
                        if (!user.email) {
                          setEditModalOpen(true);
                          setInfoType('email');
                        } else {
                          null;
                        }
                      }}
                    >
                      {user.email ? hideEmail(user.email) : 'add email'}
                    </p>
                  </UserInformation>
                  <Actions>
                    <EditBtn
                      onClick={() => {
                        setEditModalOpen(true);
                        setInfoType('email');
                      }}
                    >
                      Edit
                    </EditBtn>
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
              onKeyDown={(event) =>
                event.key === 'Escape' ? setProfileOpen(false) : null
              }
              onClick={() => setProfileOpen(false)}
            >
              <i className='fas fa-times'></i>
            </EscapeBtn>
            <p>ESC</p>
          </ButtonContainer>
        </EscapeBarContents>
      </EscapeBar>
    </ProfilePageWrapper>
  );
}
