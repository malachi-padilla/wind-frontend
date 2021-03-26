// Will Extract This Into Folder Later

export interface PrivateChatMessage {
  message: string;
  sentBy: string;
}

export interface SideBarProps {
  friend: string;
  setFriend: (friend: string) => any;
  userInfo: PersonalUserInfo;
  recipientIsTyping: boolean;
  friendsIsOpen: boolean;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  friendsList: any;
}

export interface PersonalUserInfo {
  userId: string;
  username: string;
}

export type UserContext = [
  user: PersonalUserInfo | null | undefined,
  setUser: any
];
