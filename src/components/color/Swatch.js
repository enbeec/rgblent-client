import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "@bootstrap-styled/v4";
import { AuthContext } from "../auth/AuthProvider.js";
import { isNobody } from "../../utils/auth.js";
import { useHover } from "../../hooks/useHover";

export const Swatch = (props) => {
  const [dropState, setDropState] = useState(false);
  const [hoverRef, swatchHover] = useHover();
  const { startFavorite } = useContext(AuthContext);

  return (
    <div ref={hoverRef}>
      <SWATCH {...props}>
        {props.noHover || (
          <ButtonDropdown
            isOpen={dropState}
            toggle={() => setDropState(!dropState)}
            className={"w-30 mx-auto my-auto"}
            hidden={!swatchHover}
          >
            <DropdownToggle style={{ fontSize: "1.2em" }}>☰</DropdownToggle>
            <DropdownMenu>
              {props?.dropdownExtras &&
                props.dropdownExtras.map((itemProps, index) => (
                  <DropdownItem {...itemProps} key={index} />
                ))}
              <DropdownItem>Blend</DropdownItem>
              <DropdownItem
                disabled={isNobody()}
                onClick={() => startFavorite(props.color)}
              >
                Favorite
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        )}
      </SWATCH>
    </div>
  );
};

const SWATCH = styled.div`
  ${({ size }) => css`
    height: ${size}rem;
    width: ${size}rem;
  `}
  margin: auto;
  background-color: ${({ color }) => color};
  border-radius: 100%;
  border: 1px solid darkgrey;
  box-shadow: 0px 2px 2px darkgrey;
`;
