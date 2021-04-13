import { FormTitle } from "Pages/Login/Login-css";
import React from "react";
import { ModalContainer } from "Theme/containers";
import {
  MediaBox,
  Media,
  SliderContainer,
  ImageIconSmall,
  ImageIconBig,
  Slider,
  MediaWrapper,
  CropCircle,
} from "./EditMediaModal-css";
import { CancelBtn, DoneBtn, FormFooter } from "./EditModal-css";

export default function EditMediaModal({
  avatar,
  open,
  setAvatar,
  uploadAvatar,
}) {
  return (
    <ModalContainer
      onClick={() => {
        setAvatar("");
        open(false);
      }}
    >
      <MediaBox onClick={(e) => e.stopPropagation()}>
        <FormTitle>
          <h1>Edit Media</h1>
        </FormTitle>
        <MediaWrapper>
          <Media
            src={
              avatar.length !== "" ? URL.createObjectURL(avatar[0]) : undefined
            }
            alt="avatar"
          ></Media>
          <CropCircle></CropCircle>
        </MediaWrapper>
        <SliderContainer>
          <ImageIconSmall className="far fa-file-image"></ImageIconSmall>
          <Slider type="range"></Slider>
          <ImageIconBig className="far fa-file-image"></ImageIconBig>
        </SliderContainer>
        <FormFooter style={{ height: "10%" }}>
          <CancelBtn
            onClick={() => {
              setAvatar("");
              open(false);
            }}
          >
            Cancel
          </CancelBtn>
          <DoneBtn onClick={uploadAvatar}>Apply</DoneBtn>
        </FormFooter>
      </MediaBox>
    </ModalContainer>
  );
}
