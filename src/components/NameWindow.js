import React from "react";
import styled from "styled-components";
import { Card as CARD, Input, Button } from "@bootstrap-styled/v4";
import { Swatch } from "./reusable/Swatch.js";
import { isNobody } from "../utils/auth.js";

export const NameWindow = (props) => {
  return (
    <FlexRow>
      <Card>profile name</Card>
      <Button
        children="Logout"
        onClick={() => {
          // setPaletteName("default");
          // doLogout();
        }}
      />
    </FlexRow>
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
