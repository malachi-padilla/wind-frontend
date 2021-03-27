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
  friends: string[];
  sentFriendRequests: string[];
  recievedFriendRequests: string[];
}

export interface UserContext {
  user: PersonalUserInfo | null | undefined;
  fetchNew: boolean;
  setFetchNew: any;
}

export interface UserContextNotNull {
  user: PersonalUserInfo;
  fetchNew: boolean;
  setFetchNew: any;
}
