import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Swatch } from "./Swatch.js";
import {
  H4,
  Col,
  Row,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
  Tooltip,
} from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";
import { DEFAULT_PALETTE_MINIMAL } from "../utils/color.js";
import { isNobody } from "../utils/auth.js";
import { CopyButton } from "./reusable/CopyButton.js";

export const Palette = ({ ...props }) => {
  const { color, setColor, getPalette, KEYS } = useContext(ColorContext);
  const [name, setName] = useState("default");
  // if negative, all clean
  const [dirtyColor, setDirtyColor] = useState(-1);
  const [colors, setColors] = useState(
    DEFAULT_PALETTE_MINIMAL.colors.map((c) => c.color.rgb_hex)
  );

  const palette = useQuery(
    [KEYS.CURRENT_PALETTE, name],
    () => getPalette(name),
    {
      onSuccess: () => {
        setDirtyColor(-1);
        setColors(
          palette.data.colors.map((colorObj) => colorObj.color.rgb_hex)
        );
      },
      initialData: DEFAULT_PALETTE_MINIMAL,
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  // only one palette color can be "dirty" at a time
  const editFunc = (index) => () => {
    if (dirtyColor === index) {
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
                  <Button>Save</Button>
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

  return (
    <>
      <H4>
        {name}

        {dirtyColor >= 0 && "*"}
      </H4>
      <Row className="palette__row">
        {colors.map((color, index) => (
          <Color key={index} index={index} />
        ))}
      </Row>
    </>
  );
};

const Button = styled(BUTTON)`
  scale: 0.9;
`;

const Card = styled(CARD)`
  margin-bottom: 4%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
