import React from "react";
import styled, { css } from "styled-components";

export const Swatch = ({ color, ...props }) => {
  return <SWATCH color={color} />;
};

const SWATCH = styled.div`
  background-color: ${(props) => props.color};
  border: 2px inset darkgrey;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 1.2rem;
`;
