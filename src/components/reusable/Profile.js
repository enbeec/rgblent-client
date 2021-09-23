import React from "react";
import { Card } from "@bootstrap-styled/v4";
import { PaletteCard } from "./PaletteCard.js";
import { UserColorCard } from "./UserColorCard.js";
import { Scroll } from "./Scroll.js";

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
            <UserColorCard colors={profile.colors} />
          </Card>
        </Scroll>
      )}
    </>
  );
};
