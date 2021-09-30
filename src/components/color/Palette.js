import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  H4,
  Col,
  Row,
  Button,
  CardHeader,
  CardFooter,
  Tooltip,
  Input,
  Badge,
} from "@bootstrap-styled/v4";
import { ColorContext } from "../color/ColorProvider.js";
import { isNobody } from "../../utils/auth.js";
import { DEFAULT_PALETTE } from "../../utils/color.js";
import { KEYS } from "../../utils/query.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { PaletteCard } from "./PaletteCard.js";

export const Palette = ({ ...props }) => {
  useContext(AuthContext);
  const { getPalette, color, setColor } = useContext(ColorContext);
  const [name, setName] = useState("default");

  // initial state will be overridden by the query
  const [paletteState, setPaletteState] = useState(DEFAULT_PALETTE);

  const paletteQuery = useQuery(
    [KEYS.CURRENT_PALETTE, name],
    () => getPalette(name),
    {
      // paletteState needs to be more minimal so we strip out everything but:
      // 	the name
      // 	the color labels
      // 	the color hex values
      // 	if we own the palette
      onSuccess: (data) => {
        setPaletteState({
          name: data.name,
          isMine: data.isMine,
          colors: data.colors.map((c) => ({
            label: c.label,
            color: {
              rgb_hex: c.color.rgb_hex,
            },
          })),
        });
      },
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  const compareColors = (colorA, colorB) =>
    colorA.label === colorB.label &&
    colorA.color.rgb_hex === colorB.color.rgb_hex;

  // returns an array of indexes for local state colors that don't match query state
  const dirtyColorIndexes = () =>
    paletteState.colors
      .map((c, index) =>
        compareColors(c, paletteQuery.colors[index]) ? null : index
      )
      .filter(Boolean);

  const colorsDirty = () => !!dirtyColorIndexes.length;
  const nameDirty = () => paletteState.name !== paletteQuery.data.name;

  // this function returns a callback that I can pass to each PaletteCard
  // 	in this case, it sets the ColorContext state color from the PaletteCard
  // 	this works because PaletteCard is always synced with paletteState
  // 	each created callback has the proper index "hardcoded" in
  // 	and as arrow functions they have access to the scope they were defined in
  const setDetailCallback = (index) => () =>
    setColor(paletteState.colors[index].color.rgb_hex);

  // this is the same pattern but the returned callback takes an argument
  const saveColorCallback = (index) => (rgb_hex) => {
    const copy = { ...paletteState };
    copy.colors[index].color.rgb_hex = rgb_hex;
    setPaletteState(copy);
  };

  const saveLabelCallback = (index) => (label) => {
    const copy = { ...paletteState };
    copy.colors[index].label = label;
    setPaletteState(copy);
  };

  // I usually inline this kind of predicate callback but since PaletteCard takes
  // 	a lot of props I'll keep defining higher order functions like this

  const colorIsDirtyCallback = (index) => () =>
    paletteState.colors[index].label !== paletteQuery.data.colors[index].label;

  const labelIsDirtyCallback = (index) => () =>
    paletteState.colors[index].color.rgb_hex !==
    paletteQuery.data.colors[index].color.rgb_hex;

  return (
    paletteQuery.isLoading || (
      <>
        <FlexRow>
          <H4>
            {paletteState.name}

            {(nameDirty() || colorsDirty()) && "*"}
          </H4>
          {(nameDirty() || colorsDirty()) && <Button>Save Changes</Button>}
        </FlexRow>
        <Row className="palette__row">
          {paletteState.colors.map((color, index) => (
            <PaletteCard
              key={index}
              index={index}
              color={color.color.rgb_hex}
              label={color.label}
              labelIsDirtyFunc={labelIsDirtyCallback(index)}
              colorIsDirtyFunc={colorIsDirtyCallback(index)}
              saveLabelFunc={saveLabelCallback(index)}
              saveColorFunc={saveColorCallback(index)}
            />
          ))}
        </Row>
      </>
    )
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
