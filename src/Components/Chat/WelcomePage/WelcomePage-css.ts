import styled from "styled-components";
import { Logo } from "Theme/Misc";
import { FlexRowCenterCenter } from "Theme/Containers";

export const Title = styled(FlexRowCenterCenter)`
  color: ${(props) => props.theme.messaging.secondaryGrey};
`;

export const StyledLogo = styled(Logo)`
  margin-left: 15px;
`;
