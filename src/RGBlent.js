import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Swatch } from "./components/Swatch.js";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");

  return (
    <ColumnContainer>
      <LeftColumn>
        <Separator height={1} />
        <HexColorPicker color={pickerColor} onChange={setPickerColor} />
        <Separator height={1} />
        <Swatch color={pickerColor} />
        <Separator height={1} />
      </LeftColumn>
      <RightColumn>
        <MockSidebar />
      </RightColumn>
    </ColumnContainer>
  );
};

const width = (props) => props.width;
const height = (props) => props.height;

const Separator = styled.div`
  width: ${width}rem;
  height: ${height}rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid black;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dotted black;
  align-items: center;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dotted black;
`;

const MockSidebar = styled.div`
  width: 24rem;
`;
