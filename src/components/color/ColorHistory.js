import React, { useContext } from "react";
import styled from "styled-components";
import { Container as CONTAINER, Col as COL, Row } from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";
import { Swatch } from "./Swatch.js";

export const ColorHistory = (props) => {
  const { colorHistory } = useContext(ColorContext);

  return (
    <Container>
      <Row>
        {colorHistory.history
          .slice()
          .reverse()
          .map((c, i) => (
            // going to an offset negative index because we reversed history
            <Col onClick={() => colorHistory.go(-i - 1)}>
              <Swatch noHover={true} size={3} color={c} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

const Col = styled(COL)`
  margin-top: 0.5rem;
`;

const Container = styled(CONTAINER)`
  padding-left: 0;
  padding-right: 2.5rem;
`;
