import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Swatch } from "./reusable/Swatch.js";
import {
  H4,
  Col,
  Row,
  Button,
  Card as CARD,
  CardHeader,
  CardFooter,
  Tooltip,
  Input,
} from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";
import { DEFAULT_PALETTE_MINIMAL } from "../utils/color.js";
import { isNobody } from "../utils/auth.js";
import { CopyButton } from "./reusable/CopyButton.js";
import { AuthContext } from "./AuthProvider.js";

export const Palette = ({ ...props }) => {
  // importing this forces the Palette to update based on login state
  const { profile } = useContext(AuthContext); // eslint-disable-line
  const { paletteName, setPaletteName, color, setColor, getPalette, KEYS } =
    useContext(ColorContext);
  // if negative, all clean
  const [dirtyColor, setDirtyColor] = useState(-1);
  const [allDirty, setAllDirty] = useState(false);
  const [newPalette, setNewPalette] = useState(null);
  const [colors, setColors] = useState(
    DEFAULT_PALETTE_MINIMAL.colors.map((c) => c.color.rgb_hex)
  );

  const handleSavePalette = () => {
    const allColorsValid = newPalette.colors.reduce((valid, color) => {
      if (color.length !== 7) {
        return false;
      }
      return true;
    }, true);

    if (allColorsValid) {
      window.alert("Validation Passed");
    } else {
      window.alert("Validation Failed");
    }
  };

  const palette = useQuery(
    [KEYS.CURRENT_PALETTE, paletteName],
    () => getPalette(paletteName),
    {
      onSuccess: () => {
        if (!allDirty) {
          setDirtyColor(-1);
          setColors(
            palette.data.colors.map((colorObj) => colorObj.color.rgb_hex)
          );
        }
      },
      initialData: DEFAULT_PALETTE_MINIMAL,
      keepPreviousData: true,
    }
  );

  // only one palette color can be "dirty" at a time
  const editFunc = (index) => () => {
    if (allDirty) {
      // IF ALL DIRTY
      const copy = { ...newPalette };
      copy.colors[index] = color;
      setNewPalette(copy);
      setColors(newPalette.colors);
    } else if (dirtyColor === index) {
      setDirtyColor(-1);
      setColors(
        colors.map(
          (this_color, this_index) =>
            palette.data.colors[this_index].color.rgb_hex
        )
      );
    } else {
      setDirtyColor(index);
      setColors(
        colors.map((this_color, this_index) =>
          index === this_index
            ? color
            : palette.data.colors[this_index].color.rgb_hex
        )
      );
    }
  };

  const [openTooltip, setOpenTooltip] = useState(-1);
  const toggleTooltipFunc = (index) => () => {
    if (openTooltip === index) {
      setOpenTooltip(-1);
    } else {
      setOpenTooltip(index);
    }
  };

  const Color = (props) => {
    const editColor = () => setColor(colors[props.index]);
    const paletteColor = palette.data?.colors[props.index];
    const displayedColor = colors[props.index];
    const colorIsDirty = dirtyColor === props.index;
    const id = "palette-color-" + props.index;
    return (
      <>
        <Col style={{ margin: "auto", paddingRight: "4%" }}>
          <Card
            style={{
              border: colorIsDirty ? "2px dotted darkgrey" : "",
            }}
          >
            <CardHeader>
              {paletteColor.color.rgb_hex === displayedColor
                ? paletteColor.label
                : displayedColor}
            </CardHeader>
            <Swatch
              {...props}
              color={displayedColor}
              size={8}
              style={{ margin: "8%", display: "inline-block" }}
              dropdownExtras={[
                { children: "View Details", onClick: editColor },
              ]}
              onDoubleClick={editColor}
            />
            <CardFooter>
              <FlexRow>
                <Button
                  id={id}
                  disabled={isNobody()}
                  onClick={editFunc(props.index)}
                >
                  {colorIsDirty ? "Restore" : "Replace"}
                </Button>
                {paletteColor.color.rgb_hex === displayedColor ? (
                  <CopyButton id={`palette-color__copy-button-${props.index}`}>
                    {displayedColor}
                  </CopyButton>
                ) : (
                  <Button style={{ width: "5rem" }}>Save</Button>
                )}
              </FlexRow>
            </CardFooter>
          </Card>
        </Col>
        {isNobody() && (
          <Tooltip
            isOpen={openTooltip === props.index}
            toggle={toggleTooltipFunc(props.index)}
            target={id}
            placement="top"
          >
            Login/Register to edit palettes
          </Tooltip>
        )}
      </>
    );
  };

  const PaletteName = (props) => {
    return !newPalette ? (
      <H4 style={{ marginTop: "0.5rem" }}>
        {`${paletteName}${allDirty || dirtyColor >= 0 ? "*" : ""}`}
      </H4>
    ) : (
      <Input
        onChange={(e) => {
          const copy = { ...newPalette };
          copy.name = e.target.value;
          setNewPalette(copy);
        }}
        placeholder="new palette name"
      />
    );
  };

  return (
    <>
      <FlexRow style={{ padding: "0.4rem", justifyContent: "space-around" }}>
        {PaletteName()}
        <FlexRow
          style={{ paddingBottom: "0.5rem", justifyContent: "space-around" }}
        >
          {!allDirty ? (
            <>
              <Button
                children="New"
                onClick={() => {
                  setNewPalette({
                    name: "",
                    colors: ["", "", "", "", "", "", "", ""],
                    labels: ["", "", "", "", "", "", "", ""],
                  });
                  setColors([
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                    "#d3d3d3",
                  ]);
                  setAllDirty(true);
                }}
              />
            </>
          ) : (
            <>
              <Button
                children="Save"
                onClick={handleSavePalette}
                disabled={isNobody()}
              />
              <Button
                children="Restore"
                onClick={() => {
                  setColors(
                    palette.data.colors.map(
                      (colorObj) => colorObj.color.rgb_hex
                    )
                  );
                  setNewPalette(null);
                  setAllDirty(false);
                }}
              />
            </>
          )}
        </FlexRow>
      </FlexRow>
      <Row className="palette__row">
        {colors.map((color, index) => (
          <Color key={index} index={index} />
        ))}
      </Row>
    </>
  );
};

const Card = styled(CARD)`
  margin-bottom: 4%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
