import React, { useContext } from "react";
import styled from "styled-components";
import { Card, Input, Button } from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";
import { AuthContext } from "./AuthProvider.js";
import { Swatch } from "./reusable/Swatch.js";
import { isNobody } from "../utils/auth.js";

export const NameWindow = (props) => {
  const {
    newFavorite,
    setNewFavorite,
    finishNewFavorite,
    cancelNewFavorite,
    profile,
    doLogout,
  } = useContext(AuthContext);
  return (
    isNobody() ||
    (!!newFavorite ? (
      <FlexRow>
        <Button children="Save" onClick={finishNewFavorite} />
        <Button children="Cancel" onClick={cancelNewFavorite} />
        <Input
          placeholder="Color Name"
          onChange={(e) => {
            const copy = { ...newFavorite };
            copy.name = e.target.value;
            setNewFavorite(copy);
          }}
        />
        <Swatch
          style={{ margin: "0.5rem" }}
          size={1}
          color={newFavorite.rgb_hex}
        />
      </FlexRow>
    ) : (
      <FlexRow>
        <Card
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "0.3rem",
          }}
        >
          {profile?.name && profile.name}
        </Card>
        <Button onClick={doLogout}>Logout</Button>
      </FlexRow>
    ))
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
