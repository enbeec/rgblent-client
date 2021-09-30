import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  H4,
  Col,
  Row,
  Button as BUTTON,
  CardHeader,
  CardFooter,
  Tooltip,
  Input,
  Badge,
} from "@bootstrap-styled/v4";
import { ColorContext } from "../color/ColorProvider.js";
import { isNobody } from "../../utils/auth.js";
import { DEFAULT_PALETTE_MINIMAL } from "../../utils/color.js";
import { KEYS } from "../../utils/query.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { PaletteCard } from "./PaletteCard.js";

export const Palette = ({ ...props }) => {
  useContext(AuthContext);
  const { getPalette, color, setColor } = useContext(ColorContext);
  const [name, setName] = useState("default");
  const [colors, setColors] = useState(
    DEFAULT_PALETTE_MINIMAL.colors.map((c) => c.color.rgb_hex)
  );

  const palette = useQuery(
    [KEYS.CURRENT_PALETTE, name],
    () => getPalette(name),
    {
      onSuccess: (data) => {
        setColors(data.colors.map((colorObj) => colorObj.color.rgb_hex));
      },
      initialData: DEFAULT_PALETTE_MINIMAL,
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <FlexRow>
        <H4>
          {name}

          {false && "test if palette is dirty" && "*"}
        </H4>
      </FlexRow>
      <Row className="palette__row">
        {colors.map((color, index) => (
          <PaletteCard
            key={index}
            index={index}
            setColor={setColor}
            colorArray={colors}
            palette={palette}
          />
        ))}
      </Row>
    </>
  );
};

const Button = styled(BUTTON)`
  scale: 0.9;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
