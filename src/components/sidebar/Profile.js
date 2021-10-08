import React, { useContext } from "react";
import styled from "styled-components";
import { Card as CARD } from "@bootstrap-styled/v4";
import { AuthContext } from "../auth/AuthProvider.js";
import { MiniPalette } from "./MiniPalette.js";
import { Faves } from "./Faves.js";

export const Profile = ({ ...props }) => {
  const { profile } = useContext(AuthContext);
  return (
    profile.isLoading ||
    !profile.data || (
      <Card>
        {profile.data.palettes.length === 0 ||
          profile.data.palettes.map((p) => <MiniPalette palette={p} />)}
        {profile.data.colors.length && <Faves colors={profile.data.colors} />}
      </Card>
    )
  );
};

const Card = styled(CARD)`
  margin: ${(props) => props.theme["$spacer-halved"]};
  margin-right: ${(props) => props.theme["$spacer-halved"]};
`;
