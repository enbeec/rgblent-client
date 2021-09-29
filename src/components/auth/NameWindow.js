import React, { useContext } from "react";
import styled from "styled-components";
import { Card as CARD, Input, Button } from "@bootstrap-styled/v4";
import { Swatch } from "../color/Swatch.js";
import { isNobody } from "../../utils/auth.js";
import { AuthContext } from "./AuthProvider.js";

export const NameWindow = (props) => {
  const {
    profile,
    doLogout,
    updateFavoriteLabel,
    newFavorite,
    endFavorite,
    cancelFavorite,
  } = useContext(AuthContext);

  return (
    isNobody() || (
      <FlexRow>
        {newFavorite ? (
          <>
            <Swatch
              noHover={true}
              color={newFavorite.rgb_hex}
              size={1.5}
              style={{ marginRight: "0.2rem", marginTop: "0.5rem" }}
            />
            <Input
              placeholder="name this color"
              onChange={updateFavoriteLabel}
              style={{ marginRight: "0.2rem" }}
            />
            <Button
              size="sm"
              children="Submit"
              onClick={() => endFavorite()}
              style={{ marginRight: "0.2rem" }}
            />
            <Button
              size="sm"
              children="Cancel"
              onClick={cancelFavorite}
              style={{ marginRight: "0.2rem" }}
            />
          </>
        ) : (
          <>
            <Card>
              {profile.isLoading ? "...loading..." : profile.data?.name}
            </Card>
            <Button
              children="Logout"
              onClick={() => {
                // setPaletteName("default");
                doLogout();
              }}
            />
          </>
        )}
      </FlexRow>
    )
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Card = styled(CARD)`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.3rem;
`;
