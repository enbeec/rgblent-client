import React from "react";
import styled from "styled-components";
import { Card, CardText } from "@bootstrap-styled/v4";
import { PaletteCard } from "./PaletteCard.js";

export const Profile = ({ isLoading, profile, ...props }) => {
  return (
    <>
      <Card style={{ padding: "1rem" }}>{profile.name}</Card>
      {profile.palettes && (
        <Scroll>
          {profile.palettes.map((palette) => (
            <PaletteCard palette={palette} />
          ))}
        </Scroll>
      )}
      {profile.colors && (
        <Scroll>
          {profile.colors.map((color) => (
            <CardText>{color.lable}</CardText>
          ))}
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
