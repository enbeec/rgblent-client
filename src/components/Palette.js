import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Swatch } from "./Swatch.js";
import {
  Col,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
} from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";

export const Palette = (props) => {
  const { color, setColor, getPalette, KEYS } = useContext(ColorContext);
  const [name, setName] = useState("default");
  const [colors, setColors] = useState([
    // if you see these colors, the backend is not responding
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
  ]);

  const palette = useQuery(
    [KEYS.CURRENT_PALETTE, name],
    () => getPalette(name),
    {
      onSuccess: () =>
        setColors(
          palette.data.colors.map((colorObj) => colorObj.color.rgb_hex)
        ),
      placeholderData: {
        // just the necessary placeholder parts
        colors: [
          {
            label: "yellow-orange",
            color: { rgb_hex: "#FFDF80" },
          },
          {
            label: "yellow-green",
            color: { rgb_hex: "#BFFF80" },
          },
          {
            label: "green",
            color: { rgb_hex: "#80FF9F" },
          },
          {
            label: "cyan",
            color: { rgb_hex: "#80FFFF" },
          },
          {
            label: "blue",
            color: { rgb_hex: "#809FFF" },
          },
          {
            label: "purple",
            color: { rgb_hex: "#BF80FF" },
          },
          {
            label: "pink",
            color: { rgb_hex: "#FF80DF" },
          },
          {
            label: "red",
            color: { rgb_hex: "#FF8080" },
          },
        ],
      },
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  const editFunc = (index) => () => {
    setColors(
      colors.map((this_color, this_index) =>
        index === this_index ? color : this_color
      )
    );
  };

  const Color = (props) => {
    const editColor = () => setColor(colors[props.index]);
    return (
      <Col style={{ margin: "auto", paddingRight: "4%" }}>
        <Card>
          <CardHeader>
            {palette.data.colors[props.index].color.rgb_hex ===
            colors[props.index]
              ? palette.data.colors[props.index].label
              : colors[props.index]}
          </CardHeader>
          <Swatch
            {...props}
            color={colors[props.index]}
            size={8}
            style={{ margin: "8%", display: "inline-block" }}
            dropdownExtras={[{ children: "View Details", onClick: editColor }]}
            onDoubleClick={editColor}
          />
          <CardFooter>
            <FlexRow>
              <Button onClick={editFunc(props.index)}>Replace</Button>
              {palette.data.colors[props.index].color.rgb_hex ===
              colors[props.index] ? (
                colors[props.index]
              ) : (
                <Button>Save</Button>
              )}
            </FlexRow>
          </CardFooter>
        </Card>
      </Col>
    );
  };

  return (
    <>
      {colors.map((color, index) => (
        <Color key={index} index={index} />
      ))}
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
