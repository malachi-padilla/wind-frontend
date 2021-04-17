import { getUserByUsernameRequest, updateUserInfo } from "Api/user";
import { ModalProps } from "Components/Types/props";
import { MyContext } from "Context";
import { FormInputs, FormTitle } from "Pages/Login/Login-css";
import React, { useContext, useEffect, useState } from "react";
import { InputBox, ModalContainer } from "Theme/containers";
import { UserContextNotNull } from "Types/types";
import {
  ExitBtn,
  FormFooter,
  CancelBtn,
  DoneBtn,
  InputUsername,
} from "./EditModal-css";

export default function EditModal({ username, setEditModalOpen }: ModalProps) {
  const { setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [userInput, setUserInput] = useState<any>();
  const [userExistsError, setUserExistsError] = useState<boolean>(false);

  const updateUsername = async (key: string, e: any) => {
    const userFound = await getUserByUsernameRequest(e.target.value)
      .then((res) => res)
      .catch(() => "NOT FOUND");
    if (userFound !== "NOT FOUND") {
      setUserExistsError(true);
    } else {
      updateUserInfo(key, e)?.then(() => {
        setFetchNew((current) => !current);
        setEditModalOpen(false);
      });
    }
  };

  useEffect(() => {
    setUserExistsError(false);
  }, [userInput]);

  return (
    <ModalContainer onClick={() => setEditModalOpen(false)}>
      <InputBox onClick={(e) => e.stopPropagation()}>
        <ExitBtn onClick={() => setEditModalOpen(false)}>
          <i className="fas fa-times"></i>
        </ExitBtn>
        <FormTitle>
          <h1>Change your username</h1>
        </FormTitle>
        <FormInputs>
          <label>{userExistsError ? "USERNAME TAKEN" : "USERNAME"}</label>
          <InputUsername
            error={userExistsError}
            onChange={(e) => setUserInput(e)}
            placeholder={`${username}`}
          ></InputUsername>
        </FormInputs>
        <FormFooter>
          <CancelBtn onClick={() => setEditModalOpen(false)}>Cancel</CancelBtn>
          <DoneBtn
            onClick={() => {
              updateUsername("username", userInput);
            }}
          >
            Done
          </DoneBtn>
        </FormFooter>
      </InputBox>
    </ModalContainer>
  );
}
