import React, { useContext } from "react";
import styled from "styled-components";
import { Card, CardText, Button } from "@bootstrap-styled/v4";
import { PaletteCard } from "./PaletteCard.js";
import { ColorContext } from "../ColorProvider.js";
import { Scroll } from "./Scroll.js";

export const UserColorCard = ({ colors, ...props }) => {
  const { setColor } = useContext(ColorContext);
  return (
    colors &&
    colors.map(
      (color) =>
        color && (
          <CardText
            children={
              <FlexRow>
                {color.label ? color.label : color.color.rgb_hex}
                <Button
                  onClick={() => setColor(color.color.rgb_hex)}
                  children="Load"
                  style={{
                    backgroundColor: color.color.rgb_hex,
                    marginLeft: "20%",
                  }}
                />
              </FlexRow>
            }
            key={color?.label || color.color.rgb_hex}
            style={{
              textAlign: "center",
              margin: "0.4rem",
            }}
          />
        )
    )
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
