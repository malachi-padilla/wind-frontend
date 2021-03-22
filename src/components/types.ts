// Will Extract This Into Folder Later

export interface PrivateChatMessage {
    message: string;
    sentBy: string;
}

export interface SideBarProps {
    friend: string;
    setFriend: (friend: string) => any;
    user: UserContext;

}

export interface UserContext {
    userId: string;
    username: string;
}