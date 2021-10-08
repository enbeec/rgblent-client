import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Card as CARD,
  Input as INPUT,
  Button as BUTTON,
  Tooltip,
} from "@bootstrap-styled/v4";
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
          <>
            <Swatch noHover={true} color={newFavorite.rgb_hex} size={3} />
            <Input
              placeholder="name this color"
              id="favorite__input"
              size="sm"
              onChange={updateFavoriteLabel}
            />
            <Tooltip target="favorite__input" isOpen={!!errorMessage}>
              {errorMessage}
            </Tooltip>
            <Button
              size="sm"
              children="Submit"
              disabled={favoriteIsSubmitting()}
              onClick={() => endFavorite().catch(setErrorMessage)}
            />
            <Button size="sm" children="Cancel" onClick={cancelFavorite} />
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
  margin: ${(props) => props.theme["$spacer-halved"]};
`;

const Card = styled(CARD)`
  margin-top: ${(props) => props.theme["$spacer"]};
  margin-bottom: ${(props) => props.theme["$spacer"]};
  padding: ${(props) => props.theme["$spacer"]};
`;

const Button = styled(BUTTON)`
  margin-top: ${(props) => props.theme["$spacer"]};
  margin-bottom: ${(props) => props.theme["$spacer"]};
  margin-right: ${(props) => props.theme["$spacer-halved"]};
  padding: ${(props) => props.theme["$spacer-halved"]};
  padding-top: ${(props) => props.theme["$spacer-halved"]};
`;

const Input = styled(INPUT)`
  margin-top: ${(props) => props.theme["$spacer"]};
  margin-bottom: ${(props) => props.theme["$spacer"]};
  margin-right: ${(props) => props.theme["$spacer-halved"]};
  padding: ${(props) => props.theme["$spacer-halved"]};
  padding-top: ${(props) => props.theme["$spacer-halved"]};
`;
