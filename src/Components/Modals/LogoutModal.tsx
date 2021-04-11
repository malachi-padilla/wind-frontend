import { FormTitle } from "Pages/Login/Login-css";
import React from "react";
import { ModalContainer } from "Theme/containers";
import { CancelBtn, FormFooter } from "./EditModal-css";
import { LogoutBtn, ModalBox } from "./LogoutModal-css";

export default function LogoutModal({ logout, open }) {
  return (
    <ModalContainer onClick={() => open(false)}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <FormTitle>
          <h1>Log Out</h1>
          <h3>Are you sure you want to logout?</h3>
        </FormTitle>
        <FormFooter style={{ height: "30%" }}>
          <CancelBtn onClick={() => open(false)}>Cancel</CancelBtn>
          <LogoutBtn onClick={logout}>Logout</LogoutBtn>
        </FormFooter>
      </ModalBox>
    </ModalContainer>
  );
}
