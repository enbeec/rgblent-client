import React, { useContext } from "react";
import { Card } from "@bootstrap-styled/v4";
import { AuthContext } from "../auth/AuthProvider.js";
import { MiniPalette } from "./MiniPalette.js";
import { Faves } from "./Faves.js";

export const Profile = ({ ...props }) => {
  const { profile } = useContext(AuthContext);
  return (
    profile.isLoading ||
    !profile.data || (
      <Card>
        {profile.data.palettes.length &&
          profile.data.palettes.map((p) => <MiniPalette palette={p} />)}
        {profile.data.colors.length && <Faves colors={profile.data.colors} />}
      </Card>
    )
  );
};
