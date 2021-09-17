import React, { useState } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  AccordionGroup,
  Accordion,
} from "@bootstrap-styled/v4";
import { Swatch } from "./Swatch.js";

export const ColorDetail = ({ color, colorInfo, loading, ...props }) => {
  const [activeAccordion, setActiveAccordion] = useState("");

  const accordionChange = (clickedName) => {
    if (clickedName === activeAccordion) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(clickedName);
    }
  };

  return (
    <>
      <Col>
        <Swatch color={color} size={20} style={{ margin: "auto" }} />
      </Col>
      <Col>
        <AccordionGroup
          activeAccordionName={activeAccordion}
          onChange={accordionChange}
          style={{ marginRight: "50%" }}
        >
          <Accordion heading="RGB" name="RGB">
            {loading || !colorInfo ? (
              ""
            ) : (
              <ListGroup>
                <ListGroupItem>Red: {colorInfo.rgb.rgb_r}</ListGroupItem>
                <ListGroupItem>Green: {colorInfo.rgb.rgb_g}</ListGroupItem>
                <ListGroupItem>Blue: {colorInfo.rgb.rgb_b}</ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="HSV" name="HSV">
            {loading || !colorInfo ? (
              ""
            ) : (
              <ListGroup>
                <ListGroupItem>
                  Hue: {colorInfo.hsv.hsv_h.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Saturation: {colorInfo.hsv.hsv_s.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Value: {colorInfo.hsv.hsv_v.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="HSL" name="HSL">
            {loading || !colorInfo ? (
              ""
            ) : (
              <ListGroup>
                <ListGroupItem>
                  Hue: {colorInfo.hsl.hsl_h.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Saturation: {colorInfo.hsl.hsl_s.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Lightness: {colorInfo.hsl.hsl_l.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="CIELAB" name="LAB">
            {loading || !colorInfo ? (
              ""
            ) : (
              <ListGroup>
                <ListGroupItem>
                  L* {"=>"} {colorInfo.lab.lab_l.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  a* {"=>"} {colorInfo.lab.lab_a.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  b* {"=>"} {colorInfo.lab.lab_b.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="CIEXYZ" name="XYZ">
            {loading || !colorInfo ? (
              ""
            ) : (
              <ListGroup>
                <ListGroupItem>
                  X {"=>"} {colorInfo.xyz.xyz_x.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Y {"=>"} {colorInfo.xyz.xyz_y.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Z {"=>"} {colorInfo.xyz.xyz_z.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
        </AccordionGroup>
      </Col>
    </>
  );
};
