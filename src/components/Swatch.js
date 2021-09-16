import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useHover } from "../hooks/useHover";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "@bootstrap-styled/v4";

export const Swatch = (props) => {
  const [dropState, setDropState] = useState(false);
  const [swatchRef, swatchHover] = useHover();

  return (
    <SWATCH {...props} ref={swatchRef}>
      <ButtonDropdown
        isOpen={dropState}
        toggle={() => setDropState(!dropState)}
        className={"w-30 mx-auto my-auto"}
        hidden={!swatchHover}
      >
        <DropdownToggle>☰</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Blend</DropdownItem>
          <DropdownItem>Favorite</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </SWATCH>
  );
};

const SWATCH = styled.div`
  ${({ size }) => css`
    height: ${size}rem;
    width: ${size}rem;
  `}
  margin: auto;
  background-color: ${({ color }) => color};
  border: 2px inset darkgrey;
  border-radius: 100%;
`;
