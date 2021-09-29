import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Card as CARD, Input, Button, Tooltip } from "@bootstrap-styled/v4";
import { Swatch } from "../color/Swatch.js";
import { isNobody } from "../../utils/auth.js";
import { AuthContext } from "./AuthProvider.js";
import { useTimeoutFn } from "react-use";

export const NameWindow = (props) => {
  const {
    profile,
    doLogout,
    updateFavoriteLabel,
    newFavorite,
    endFavorite,
    cancelFavorite,
    favoriteIsSubmitting,
  } = useContext(AuthContext);

  const clearFavoriteState = cancelFavorite; // they're the same thing

  const [errorMessage, _setErrorMessage] = useState(null);
  const [, , resetErrorTimeout] = useTimeoutFn(() => {
    _setErrorMessage(null);
  }, 1200);

  const setErrorMessage = (error) => {
    _setErrorMessage(error.message);
    resetErrorTimeout();
  };

  return (
    isNobody() || (
      <FlexRow>
        {newFavorite ? (
          favoriteIsSubmitting() ? (
            <>...submitting...</>
          ) : (
            <>
              <Swatch
                noHover={true}
                color={newFavorite.rgb_hex}
                size={1.7}
                style={{
                  marginRight: "0.2rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.3rem",
                }}
              />
              <Input
                placeholder="name this color"
                id="favorite__input"
                onChange={updateFavoriteLabel}
                style={{ marginRight: "0.2rem" }}
              />
              <Tooltip target="favorite__input" isOpen={!!errorMessage}>
                {errorMessage}
              </Tooltip>
              <Button
                size="sm"
                children="Submit"
                onClick={() => endFavorite().catch(setErrorMessage)}
                style={{ marginRight: "0.2rem" }}
              />
              <Button
                size="sm"
                children="Cancel"
                onClick={cancelFavorite}
                style={{ marginRight: "0.2rem" }}
              />
            </>
          )
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
