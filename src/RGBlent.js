import React from "react";
import styled from "styled-components";
import {
  Container as CONTAINER,
  Col,
  Row,
  Hr,
  Card as CARD,
} from "@bootstrap-styled/v4";
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
          <Row style={{ maxHeight: "100%" }}>
            <LeftColumn>
              <Card style={{ background: "darkgrey" }}>
                <Row className="picker__row">
                  <Picker style={{ marginTop: "10%", marginBottom: "0%" }} />
                </Row>
              </Card>
              <Card style={{ background: "darkgrey" }}>
                <Row className="detail__row">
                  <Detail />
                </Row>
              </Card>
              <Hr />
              <Card style={{ background: "darkgrey" }}>
                {/* Palette renders it's own row */}
                <Palette />
              </Card>
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

const Card = styled(CARD)`
  padding: ${(props) => props.theme["$spacer"]};
  margin: ${(props) => props.theme["$spacer"]};
`;

const Container = styled(CONTAINER)`
  padding: ${(props) => props.theme["$spacer"]};
`;

const LeftColumn = styled(Col)`
  margin-left: auto;
  margin-right: auto;
`;

const RightColumn = styled(Row)`
  /*display: flex;
  flex-direction: column;*/
  width: 30rem;
  height: auto;
`;

const Sidebar = styled.div`
  margin: ${(props) => props.theme["$spacer"]};
  width: 32rem;
  border-radius: 8px;
  background-color: darkgrey;
`;
