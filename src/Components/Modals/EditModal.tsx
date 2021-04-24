import { getUserByUsernameRequest, updateUserInfo } from 'Api/user';
import { ModalProps } from 'Components/Types/props';
import { MyContext } from 'Context';
import { FormInputs, FormTitle } from 'Pages/Login/Login-css';
import React, { useContext, useEffect, useState } from 'react';
import { InputBox, ModalContainer } from 'Theme/containers';
import { UserContextNotNull } from 'Types/types';
import {
  ExitBtn,
  FormFooter,
  CancelBtn,
  DoneBtn,
  InputUsername,
  InputLabel,
} from './EditModal-css';

export default function EditModal({ setEditModalOpen, infoType }: ModalProps) {
  const { user, setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [userInput, setUserInput] = useState<any>();
  const [userExistsError, setUserExistsError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const updateUsername = async (key: string, e: any) => {
    // if (e && e.target.value.length > 2) {
    //   const userFound = await getUserByUsernameRequest(e.target.value)
    //     .then((res) => res)
    //     .catch(() => 'NOT FOUND');
    //   if (userFound !== 'NOT FOUND') {
    //     setUserExistsError(true);
    //   } else {
    //     updateUserInfo(key, e)?.then(() => {
    //       setFetchNew((current) => !current);
    //       setEditModalOpen(false);
    //     });
    //   }
    // } else {
    //   setUsernameError(true);
    // }
    setEditModalOpen(false);
  };

  const updateEmail = (key: string, e: any) => {
    if (
      e &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        e.target.value
      )
    ) {
      updateUserInfo(key, e)?.then(() => {
        setFetchNew((current) => !current);
        setEditModalOpen(false);
      });
    } else {
      setEmailError(true);
    }
  };

  useEffect(() => {
    setUserExistsError(false);
    setUsernameError(false);
    setEmailError(false);
  }, [userInput]);

  return (
    <ModalContainer onClick={() => setEditModalOpen(false)}>
      <InputBox onClick={(e) => e.stopPropagation()}>
        <ExitBtn onClick={() => setEditModalOpen(false)}>
          <i className='fas fa-times'></i>
        </ExitBtn>
        <FormTitle>
          <h1>{`Change your ${infoType}`}</h1>
        </FormTitle>
        <FormInputs>
          <InputLabel error={userExistsError || usernameError || emailError}>
            {userExistsError
              ? 'username taken'
              : usernameError || emailError
              ? `${infoType} is invalid`
              : `${infoType}`}
          </InputLabel>
          <InputUsername
            error={userExistsError || usernameError || emailError}
            onChange={(e) => setUserInput(e)}
            placeholder={
              infoType === 'email'
                ? user.email
                : infoType === 'username'
                ? user.username
                : undefined
            }
          ></InputUsername>
        </FormInputs>
        <FormFooter>
          <CancelBtn onClick={() => setEditModalOpen(false)}>Cancel</CancelBtn>
          <DoneBtn
            onClick={() =>
              infoType === 'username'
                ? updateUsername(infoType, userInput)
                : updateEmail(infoType, userInput)
            }
          >
            Done
          </DoneBtn>
        </FormFooter>
      </InputBox>
    </ModalContainer>
  );
}
