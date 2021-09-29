import React from "react";
import styled from "styled-components";
import { Container, Col, Row, Hr } from "@bootstrap-styled/v4";
import { ColorProvider } from "./components/ColorProvider.js";
import { AuthProvider } from "./components/AuthProvider.js";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { Detail } from "./components/Detail.js";
import { AuthForm } from "./components/AuthForm.js";
import { NameWindow } from "./components/NameWindow.js";

export const RGBlent = (props) => {
  return (
    <AuthProvider>
      <ColorProvider>
        <Container>
          <Row>
            <LeftColumn>
              <LeftColumnRow className="picker__row">
                <Picker style={{ marginTop: "10%", marginBottom: "0%" }} />
              </LeftColumnRow>
              <LeftColumnRow className="detail__row">
                <Detail />
              </LeftColumnRow>
              {/* Palette renders it's own row */}
              <Hr />
              <Palette />
            </LeftColumn>
            <RightColumn>
              <Sidebar>
                <AuthForm />
                <NameWindow />
              </Sidebar>
            </RightColumn>
          </Row>
        </Container>
      </ColorProvider>
    </AuthProvider>
  );
};

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftColumn = styled(Col)`
  margin-left: auto;
  margin-right: auto;
`;

const LeftColumnRow = styled(Row)`
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
`;

const Sidebar = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding: 1rem;
  width: 24rem;
  height: 98%;
  border-radius: 8px;
  background-color: darkgrey;
`;
