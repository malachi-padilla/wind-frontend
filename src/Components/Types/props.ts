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
}

export interface FriendsProps {
  friendsList: RecipientUserInfo[];
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  userInfo: PersonalUserInfo;
}

export interface ChatProps {
  socket: any;
  userInfo: PersonalUserInfo;
  pollingInterval: any;
  fetchUser: () => void;
  recipientData: any;
  pushIfNotExist: (friendName: string) => void;
  loadingRecipientData: boolean;
  setLoadingRecipientData: (loadingRecipientData: boolean) => any;
}

export interface FriendButtonProps {
  recipientId: string;
  relation: RecipientUserInfo["relation"];
}
