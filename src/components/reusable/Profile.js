import React from "react";
import styled from "styled-components";
import { Card, CardText, Button } from "@bootstrap-styled/v4";
import { PaletteCard } from "./PaletteCard.js";

export const Profile = ({ isLoading, profile, ...props }) => {
  return (
    <>
      <Card style={{ padding: "1rem" }}>{profile.name}</Card>
      {profile.palettes && (
        <Scroll>
          {profile.palettes.map((palette) => (
            <PaletteCard key={palette.name} palette={palette} />
          ))}
        </Scroll>
      )}
      {profile.colors && (
        <Scroll>
          <Card style={{ padding: "1rem", paddingTop: "0.5rem" }}>
            {profile.colors.map(
              (color) =>
                color && (
                  <CardText
                    key={color.color.rgb_hex}
                    style={{
                      textAlign: "center",
                      margin: "0.4rem",
                    }}
                  >
                    {color.label ? color.label : color.color.rgb_hex}
                    <Button
                      style={{
                        backgroundColor: color.color.rgb_hex,
                        marginLeft: "20%",
                      }}
                    >
                      Load
                    </Button>
                  </CardText>
                )
            )}
          </Card>
        </Scroll>
      )}
    </>
  );
};

const Scroll = styled.section`
  margin-top: 0.8rem;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: ${(props) => props.maxHeight || "20%"};
`;
