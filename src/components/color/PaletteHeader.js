import React, { useState } from "react";
import styled from "styled-components";
import { FlexRow } from "./Palette.js";
import { Input, Button as BUTTON, H4 as HEADING_4 } from "@bootstrap-styled/v4";

export const PaletteHeader = ({
  paletteState,
  setPaletteState,
  paletteQuery,
  setPaletteWithQueryData,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(null);

  const startEditing = () => {
    setNewName(paletteState.name);
    setIsEditing(true);
  };

  const endEditing = () => {
    if (newName !== paletteState.name)
      setPaletteState({ ...paletteState, name: newName });
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setNewName(null);
    setIsEditing(false);
  };

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

  return (
    <FlexRow>
      <ButtonRow style={{ marginRight: "0.2rem", marginLeft: "1rem" }}>
        <Button
          size="sm"
          color="info"
          onClick={isEditing ? endEditing : startEditing}
          children={isEditing ? "Save Name" : "Edit Name"}
        />
      </ButtonRow>
      {isEditing ? (
        <>
          <Input
            style={{
              margin: "0.7rem",
              marginRight: 0,
              fontSize: "1.2rem",
              width: "22%",
            }}
            defaultValue={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </>
      ) : (
        <>
          <H4>
            {paletteState.name}

            {(nameDirty() || colorsDirty()) && "*"}
          </H4>
        </>
      )}
      <ButtonRow>
        {(nameDirty() || colorsDirty()) && (
          <>
            <Button size="sm" color="success">
              Save Changes
            </Button>
            <Button
              size="sm"
              onClick={() => {
                cancelEditing();
                setPaletteWithQueryData(paletteQuery.data);
              }}
              color="danger"
            >
              Reset
            </Button>
          </>
        )}
      </ButtonRow>
    </FlexRow>
  );
};

const ButtonRow = styled.div`
  margin: auto;
`;

const Button = styled(BUTTON)`
  margin-right: 0.2rem;
`;

const H4 = styled(HEADING_4)`
  margin: 1rem;
`;
