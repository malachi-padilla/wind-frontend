import styled from 'styled-components';
import { DefaultPopOver } from 'Theme/misc';

export const PopOverContainer = styled(DefaultPopOver)<{ message: string }>`
  top: ${(props) => (props.message === 'Create DM' ? '-20px' : '-35px')};
  right: ${(props) => (props.message === 'Create DM' ? '-20px' : '-30px')};
  z-index: 20;
`;
