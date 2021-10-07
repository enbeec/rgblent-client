import React from "react";
import styled from "styled-components";
import { Container, Col, Row, Hr } from "@bootstrap-styled/v4";
import { AuthProvider } from "./components/auth/AuthProvider.js";
import { AuthForm } from "./components/auth/AuthForm.js";
import { NameWindow } from "./components/auth/NameWindow.js";
import { Palette } from "./components/color/Palette.js";
import { ColorProvider } from "./components/color/ColorProvider.js";
import { Picker } from "./components/color/Picker.js";
import { Detail } from "./components/color/Detail.js";
import { Profile } from "./components/sidebar/Profile.js";
import { OtherUsers } from "./components/sidebar/OtherUsers.js";

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
                <Profile />
                <OtherUsers />
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
`;

const Sidebar = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding: 1rem;
  width: 30rem;
  height: 98%;
  border-radius: 8px;
  background-color: darkgrey;
`;
