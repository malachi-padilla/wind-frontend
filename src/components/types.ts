// Will Extract This Into Folder Later

export interface PrivateChatMessage {
    message: string,
    sentBy: string
}

export interface ChatPageProps {
    name: string,
    friend: string
}

export interface LoginProps {
    setInChatRoom: (isInChatRoom: boolean) => any;
    setName: (name: string) => any;
    setFriend: (friend: string) => any;
}

export interface SideBarProps {
    friend: string
}