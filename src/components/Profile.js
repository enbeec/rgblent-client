import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider.js";
import { Swatch } from "./reusable/Swatch.js";
import { Row, Col, Card, CardText } from "@bootstrap-styled/v4";

export const Profile = (props) => {
  const { profile, isLoading } = useContext(AuthContext);
  return (
    <>
      <Card>{isLoading || "Fetched"}</Card>
      <Card>{profile.name}</Card>
      <Card>
        {profile.palettes &&
          profile.palettes.map((palette) => (
            <Card>
              <CardText>{palette.name}</CardText>
              <Row>
                {palette.colors.map((color) => (
                  <Col>
                    <Swatch noHover color={color.color.rgb_hex} size={2} />
                  </Col>
                ))}
              </Row>
            </Card>
          ))}
      </Card>
    </>
  );
};
