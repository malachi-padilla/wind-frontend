import { updateUserInfo } from "Api/user";
import { ModalProps } from "Components/Types/props";
import { MyContext } from "Context";
import { FormInputs, FormTitle } from "Pages/Login/Login-css";
import React, { useContext, useState } from "react";
import { InputBox, ModalContainer } from "Theme/containers";
import { DefaultInput } from "Theme/misc";
import { UserContextNotNull } from "Types/types";
import { ExitBtn, FormFooter, CancelBtn, DoneBtn } from "./EditModal-css";

export default function EditModal({ username, setEditModalOpen }: ModalProps) {
  const { setFetchNew } = useContext(MyContext) as UserContextNotNull;
  const [userInput, setUserInput] = useState<any>();

  const updateUsername = (key: string, e: any) => {
    updateUserInfo(key, e)?.then(() => {
      setFetchNew((current) => !current);
      setEditModalOpen(false);
    });
  };

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
          <label>USERNAME</label>
          <DefaultInput
            onChange={(e) => setUserInput(e)}
            placeholder={`${username}`}
          ></DefaultInput>
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
