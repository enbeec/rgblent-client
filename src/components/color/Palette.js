import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  H4 as HEADING_4,
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

  // paletteState needs to be more minimal so we strip out everything but:
  // 	the name
  // 	if we own the palette
  // 	the colors
  // 		their labels
  // 		their hex values
  const setPaletteWithQueryData = (data) => {
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
  };

  const paletteQuery = useQuery(
    [KEYS.CURRENT_PALETTE, name],
    () => getPalette(name),
    {
      onSuccess: setPaletteWithQueryData,
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  const compareColors = (colorA, colorB) =>
    colorA.label === colorB.label &&
    colorA.color.rgb_hex === colorB.color.rgb_hex;

  const nameDirty = () =>
    paletteQuery?.data ? paletteState.name !== paletteQuery.data.name : false;

  const colorsDirty = () =>
    paletteQuery?.data
      ? !!paletteQuery.data.colors.find(
          (c, i) => !compareColors(c, paletteState.colors[i])
        )
      : false;

  // these functions return a function
  // they are higher order functions that consume an argument
  // 	and bind it into the returned callback along with anything else in scope
  // this one is simple:
  // 	sets the Detail color with one of the paletteState colors
  // 	which is determined using the index at definition time (of the callback)
  const setDetailColorCallback = (index) => () =>
    setColor(paletteState.colors[index].color.rgb_hex);

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

  const labelIsDirtyCallback = (index) => () =>
    paletteQuery?.data
      ? paletteState.colors[index].label !==
        paletteQuery.data.colors[index].label
      : false;

  const colorIsDirtyCallback = (index) => () =>
    paletteQuery?.data
      ? paletteState.colors[index].color.rgb_hex !==
        paletteQuery.data.colors[index].color.rgb_hex
      : false;

  return (
    paletteQuery.isLoading || (
      <>
        <FlexRow>
          <H4>
            {paletteState.name}

            {(nameDirty() || colorsDirty()) && "*"}
          </H4>
          {(nameDirty() || colorsDirty()) && (
            <ButtonRow>
              <Button size="sm" color="success">
                Save Changes
              </Button>
              <Button
                size="sm"
                onClick={() => setPaletteWithQueryData(paletteQuery.data)}
                color="danger"
              >
                Reset
              </Button>
            </ButtonRow>
          )}
        </FlexRow>
        <Row className="palette__row">
          {paletteState.colors.map((c, index) => (
            <PaletteCard
              key={index}
              index={index}
              // this is the main Detail component color from the ColorProvider
              detailColor={color}
              color={c.color.rgb_hex}
              label={c.label}
              labelIsDirtyFunc={labelIsDirtyCallback(index)}
              colorIsDirtyFunc={colorIsDirtyCallback(index)}
              saveLabelFunc={saveLabelCallback(index)}
              saveColorFunc={saveColorCallback(index)}
              setDetailColorFunc={setDetailColorCallback(index)}
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
  justify-content: space-between;
  margin-left: 0%;
  margin-right: 0%;
  padding: 0.5rem;
`;

const H4 = styled(HEADING_4)`
  margin: 1rem;
`;

const ButtonRow = styled.div`
  margin: auto;
`;

const Button = styled(BUTTON)`
  margin-right: 0.2rem;
`;
