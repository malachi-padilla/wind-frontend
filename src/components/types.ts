// Will Extract This Into Folder Later

export interface PrivateChatMessage {
  message: string;
  recipient: string;
  sentBy: string;
  _id: string;
}

export interface SideBarProps {
  friend: string;
  setFriend: (friend: string) => any;
}

export interface UserContext {
  userId: string;
  username: string;
}
