import { searchUsersRequest } from 'Api/friends';
import { UserInfo } from 'Components/Chat/Friends/Friends-css';
import { MyContext } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriendAction, setRecentlyMessagedAction } from 'Redux/actions';
import { ReduxStore } from 'Redux/types';
import { DefaultStatusIndicator, ProfilePicture } from 'Theme/misc';
import { UserContextNotNull } from 'Types/types';
import { isOnline } from 'Util/utilFunctions';
import {
  Container,
  FriendBar,
  FriendSelectBox,
  FriendsList,
  SearchInput,
  Title,
} from './DirectMessageModal-css';

export default function DirectMessageModal({ open, allFriends }) {
  const { user } = useContext(MyContext) as UserContextNotNull;

  const { recentlyMessaged } = useSelector((state: ReduxStore) => state);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<any>(allFriends);
  const [friendInput, setFriendInput] = useState<string>('');

  const addDirectMessage = (friend) => {
    dispatch(setFriendAction(friend));
    const indexOfFriend = recentlyMessaged.indexOf(friend);
    let newRecentlyMessagedList = recentlyMessaged;
    if (indexOfFriend !== -1) {
      newRecentlyMessagedList.splice(indexOfFriend, 1);
    }
    newRecentlyMessagedList = [friend, ...newRecentlyMessagedList];
    dispatch(setRecentlyMessagedAction(newRecentlyMessagedList));
    open(false);
  };

  const searchUsers = async (searchInput) => {
    await searchUsersRequest(searchInput).then((res) => {
      setSearchResults(
        res.data.filter((item) => item.username !== user.username)
      );
    });
  };

  useEffect(() => {
    setSearchResults(allFriends);
  }, [friendInput]);

  return (
    <Container onClick={() => open(false)}>
      <FriendSelectBox onClick={(e) => e.stopPropagation()}>
        <Title>
          <h2>select friend</h2>
        </Title>
        <SearchInput
          placeholder='Type the username of a friend'
          onKeyDown={(e: any) => e.key === 'Enter' && searchUsers(friendInput)}
          onChange={(e: any) => setFriendInput(e.target.value)}
          value={friendInput}
          type='text'
        />
        <FriendsList>
          {searchResults.map((item) => (
            <FriendBar
              onClick={() => addDirectMessage(item.username)}
              key={item.userId}
            >
              <UserInfo>
                <ProfilePicture
                  src={item.profilePicture}
                  alt='profilepic'
                ></ProfilePicture>
                <DefaultStatusIndicator
                  appLocation={'Modal'}
                  online={isOnline(item.lastOnline) ? true : false}
                >
                  <span></span>
                </DefaultStatusIndicator>
                <p>{item.username}</p>
              </UserInfo>
            </FriendBar>
          ))}
        </FriendsList>
      </FriendSelectBox>
    </Container>
  );
}
