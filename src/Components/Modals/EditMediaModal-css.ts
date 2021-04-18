import styled from "styled-components";
import {
  FlexColCenterCenter,
  FlexRowCenterCenter,
  InputBox,
} from "Theme/containers";

export const MediaBox = styled(InputBox)`
  max-height: 660px;
  width: 600px;
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




