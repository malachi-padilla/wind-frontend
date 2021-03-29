// Will Extract This Into Folder Later

export interface PrivateChatMessage {
  message: string;
  sentBy: string;
}

export interface SideBarProps {
  friend: string;
  socket: any;
  setFriend: (friend: string) => any;
  userInfo: PersonalUserInfo;
  recipientIsTyping: boolean;
  friendsIsOpen: boolean;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  friendsList: any;
}

export interface FriendProps {
  friendsList: any[];
  setFriend: (friend: string) => any;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  recipientIsTyping: boolean;
  userInfo: PersonalUserInfo;
}

export interface ChatProps {
  friend: string;
  socket: any;
  userInfo: PersonalUserInfo;
  setRecipientIsTyping: (recipientIsTyping: boolean) => any;
  recipientIsTyping: boolean;
  pollingInterval: any;
}

export interface PersonalUserInfo {
  userId: string;
  username: string;
  friends: string[];
  sentFriendRequests: string[];
  recievedFriendRequests: string[];
}

export interface UserContext {
  user: PersonalUserInfo | null | undefined;
  setFetchNew: any;
}

export interface UserContextNotNull {
  user: PersonalUserInfo;
  setFetchNew: any;
}
