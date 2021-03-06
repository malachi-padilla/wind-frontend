// Will Extract This Into Folder Later

import { PersonalUserInfo, RecipientUserInfo } from "Types/models";

export interface ActiveFriendsProps {
  friendsList: RecipientUserInfo[];
}

export interface SideBarProps {
  socket: any;
  userInfo: PersonalUserInfo;
  friendsIsOpen: boolean;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  friendsList: any;
  setProfileOpen: (profileOpen: boolean) => any;
}

export interface FriendsProps {
  friendsList: RecipientUserInfo[];
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  userInfo: PersonalUserInfo;
}
export interface ProfileProps {
  setProfileOpen: (profileOpen: boolean) => any;
}
export interface ModalProps {
  setEditModalOpen: (editModalOpen: boolean) => any;
  infoType: string;
}

export interface ChatProps {
  socket: any;
  userInfo: PersonalUserInfo;
  LoadingPage: any;
  pollingInterval: any;
  fetchUser: () => void;
  recipientData: any;
  pushIfNotExist: (username: string) => void;
  loadingRecipientData: boolean;
  loadingMessages: boolean;
  setLoadingMessages: (bool: boolean) => void;
  setLoadingRecipientData: (loadingRecipientData: boolean) => any;
}

export interface FriendButtonProps {
  recipientId: string;
  relation: RecipientUserInfo["relation"];
}
