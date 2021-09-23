import React, { useContext } from "react";
import { Card, CardText } from "@bootstrap-styled/v4";
import { AuthContext } from "./AuthProvider.js";
import { ColorContext } from "./ColorProvider.js";
import { Swatch } from "./reusable/Swatch.js";
import { PaletteCard } from "./reusable/PaletteCard.js";

export const Profile = (props) => {
  const { profile, isLoading } = useContext(AuthContext);
  return (
    <>
      <Card>{isLoading || "Fetched"}</Card>
      <Card>{profile.name}</Card>
      <Card>
        {profile.palettes &&
          profile.palettes.map((palette) => <PaletteCard palette={palette} />)}
      </Card>
    </>
  );
};
