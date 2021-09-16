import React from "react";
import {
  Container,
  Row,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem,
  ListGroupAddon,
} from "@bootstrap-styled/v4";
import { Swatch } from "./Swatch.js";

export const ColorDetail = ({ color, ...props }) => {
  return (
    <>
      <Swatch style={{ marginTop: "4rem" }} color={color} size={12} />
      <Container></Container>
    </>
  );
};
