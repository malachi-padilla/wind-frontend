import styled, { css } from "styled-components";

export const defaultCSS = css`
  height: 28px;
  min-width: 90px;
  color: #fff;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 600;
`;
export const PrimaryButton = styled.button`
  ${defaultCSS};
  background-color: ${(props) => props.theme.fontColors.actionGreen};
`;

export const SecondaryButton = styled.button`
  ${defaultCSS};
  background-color: #40444b;
`;
