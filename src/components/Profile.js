import React, { useContext } from "react";
import styled from "styled-components";
import { CardGroup, Card, CardText } from "@bootstrap-styled/v4";
import { AuthContext } from "./AuthProvider.js";
import { PaletteCard } from "./reusable/PaletteCard.js";

export const Profile = (props) => {
  const { profile, isLoading } = useContext(AuthContext);
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
