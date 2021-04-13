import styled from "styled-components";
import {
  FlexColCenterCenter,
  FlexRowCenterCenter,
  InputBox,
} from "Theme/containers";

export const MediaBox = styled(InputBox)`
  max-height: 660px;
  width: 600px;
  gap: 10px;
`;

export const MediaWrapper = styled(FlexColCenterCenter)`
  height: 70%;
  width: 90%;
  position: relative;
`;

export const Media = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

export const CropCircle = styled.div`
  position: absolute;
  top: 8px;
  height: 98%;
  width: 400px;
  border: 5px solid ${(props) => props.theme.fontColors.defaultWhite};
  border-radius: 50%;
`;

export const SliderContainer = styled(FlexRowCenterCenter)`
  height: 20%;
  gap: 10px;
`;

export const ImageIconSmall = styled.i`
  font-size: 16px;
`;
export const Slider = styled.input`
  width: 70%;
`;

export const ImageIconBig = styled.i`
  font-size: 30px;
`;
