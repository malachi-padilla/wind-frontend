import { ModalProps } from "Components/Types/props";
import { FormInputs, FormTitle } from "Pages/Login/Login-css";
import React from "react";
import { InputBox, ModalContainer } from "Theme/containers";
import { DefaultInput } from "Theme/misc";
import { ExitBtn, FormFooter, CancelBtn, DoneBtn } from "./EditModal-css";

export default function EditModal({ username, setEditModalOpen }: ModalProps) {
  return (
    <ModalContainer>
      <InputBox>
        <ExitBtn onClick={() => setEditModalOpen(false)}>
          <i className="fas fa-times"></i>
        </ExitBtn>
        <FormTitle>
          <h1>Change your username</h1>
          <h3>Enter a new username and your existing password</h3>
        </FormTitle>
        <FormInputs>
          <label>USERNAME</label>
          <DefaultInput placeholder={`${username}`}></DefaultInput>
          <label>CURRENT PASSWORD</label>
          <DefaultInput></DefaultInput>
        </FormInputs>
        <FormFooter>
          <CancelBtn onClick={() => setEditModalOpen(false)}>Cancel</CancelBtn>
          <DoneBtn>Done</DoneBtn>
        </FormFooter>
      </InputBox>
    </ModalContainer>
  );
}
