import React, { useState, useContext } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  AccordionGroup,
  Accordion,
} from "@bootstrap-styled/v4";
import { Swatch } from "./Swatch.js";
import { useQuery } from "react-query";
import { ColorContext } from "./ColorProvider.js";

export const Detail = ({ ...props }) => {
  const { color, getColorInfo, KEYS } = useContext(ColorContext);
  const [activeAccordion, setActiveAccordion] = useState("RGB");
  const colorInfo = useQuery(KEYS.CURRENT_COLOR_INFO, () =>
    getColorInfo(color)
  );

  return (
    <>
      <Col>
        <Swatch
          color={color}
          size={20}
          style={{ margin: "auto", marginTop: "20%" }}
        />
      </Col>
      <Col>
        <AccordionGroup
          activeAccordionName={activeAccordion}
          onChange={setActiveAccordion}
        >
          <Accordion heading="RGB" name="RGB">
            {colorInfo.isLoading ? (
              "...loading RGB info..."
            ) : (
              <ListGroup>
                <ListGroupItem>Red: {colorInfo.data.rgb.rgb_r}</ListGroupItem>
                <ListGroupItem>Green: {colorInfo.data.rgb.rgb_g}</ListGroupItem>
                <ListGroupItem>Blue: {colorInfo.data.rgb.rgb_b}</ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="HSV" name="HSV">
            {colorInfo.isLoading ? (
              "...loading HSV info..."
            ) : (
              <ListGroup>
                <ListGroupItem>
                  Hue: {colorInfo.data.hsv.hsv_h.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Saturation: {colorInfo.data.hsv.hsv_s.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Value: {colorInfo.data.hsv.hsv_v.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="HSL" name="HSL">
            {colorInfo.isLoading ? (
              "...loading HSL info..."
            ) : (
              <ListGroup>
                <ListGroupItem>
                  Hue: {colorInfo.data.hsl.hsl_h.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Saturation: {colorInfo.data.hsl.hsl_s.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Lightness: {colorInfo.data.hsl.hsl_l.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="CIELAB" name="LAB">
            {colorInfo.isLoading ? (
              "...loading LAB info..."
            ) : (
              <ListGroup>
                <ListGroupItem>
                  L* {"=>"} {colorInfo.data.lab.lab_l.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  a* {"=>"} {colorInfo.data.lab.lab_a.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  b* {"=>"} {colorInfo.data.lab.lab_b.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
          <Accordion heading="CIEXYZ" name="XYZ">
            {colorInfo.isLoading ? (
              "...loading XYZ info..."
            ) : (
              <ListGroup>
                <ListGroupItem>
                  X {"=>"} {colorInfo.data.xyz.xyz_x.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Y {"=>"} {colorInfo.data.xyz.xyz_y.toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  Z {"=>"} {colorInfo.data.xyz.xyz_z.toFixed(2)}
                </ListGroupItem>
              </ListGroup>
            )}
          </Accordion>
        </AccordionGroup>
      </Col>
    </>
  );
};
