import React from "react";
import styled from "styled-components";

export const Scroll = styled.section`
  margin-top: 0.8rem;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: ${(props) => props.maxHeight || "20%"};
`;
