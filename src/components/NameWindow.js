import React, { useContext } from "react";
import { Card, Input, Button } from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";
import { AuthContext } from "./AuthProvider.js";
import { Swatch } from "./reusable/Swatch.js";
import { isNobody } from "../utils/auth.js";

export const NameWindow = (props) => {
  const { newFavorite, setNewFavorite, cancelNewFavorite } =
    useContext(ColorContext);
  const { profile } = useContext(AuthContext);
  return (
    isNobody() ||
    (!!newFavorite ? (
      <>
        <Button children="Save" />
        <Button children="Cancel" onClick={cancelNewFavorite} />
        <Input
          placeholder="Color Name"
          onClick={(e) => {
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
      </>
    ) : (
      <Card
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "0.3rem",
        }}
      >
        {profile?.name && profile.name}
      </Card>
    ))
  );
};
