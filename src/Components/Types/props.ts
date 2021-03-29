// Will Extract This Into Folder Later

import { PersonalUserInfo, RecipientUserInfo } from "Types/models";

export interface ActiveFriendsProps {
  friendsList: RecipientUserInfo[];
}

export interface SideBarProps {
  socket: any;
  userInfo: PersonalUserInfo;
  recipientIsTyping: boolean;
  friendsIsOpen: boolean;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  friendsList: any;
}

export interface FriendsProps {
  friendsList: RecipientUserInfo[];
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  recipientIsTyping: boolean;
  userInfo: PersonalUserInfo;
}

export interface ChatProps {
  socket: any;
  userInfo: PersonalUserInfo;
  setRecipientIsTyping: (recipientIsTyping: boolean) => any;
  recipientIsTyping: boolean;
  pollingInterval: any;
}

export interface FriendButtonProps {
  recipientId: string;
  relation: RecipientUserInfo["relation"];
  fetchUser: () => void;
}
