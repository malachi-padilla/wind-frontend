export interface PersonalUserInfo {
  userId: string;
  username: string;
  friends: string[];
  sentFriendRequests: string[];
  recievedFriendRequests: string[];
  profilePicture: string;
}

export interface RecipientUserInfo {
  friends: string[];
  lastOnline: string;
  relation: "Friends" | "Requested" | "Recipient Requested" | "None";
  userId: string;
  username: string;
  profilePicture: string;
}
