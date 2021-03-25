// Will Extract This Into Folder Later

export interface PrivateChatMessage {
  message: string;
  sentBy: string;
}

export interface SideBarProps {
  friend: string;
  setFriend: (friend: string) => any;
  userInfo: UserContext;
  recipientIsTyping: boolean;
  setRecipientIsTyping: (recipientIsTyping: boolean) => any;
  friendsIsOpen: boolean;
  setFriendsIsOpen: (friendsIsOpen: boolean) => any;
  friendsList: string[];
  setFriendsList: (friendsList: any) => any;
}

export interface UserContext {
  userId: string;
  username: string;
}
