import React, { useState, useContext } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  AccordionGroup,
  Accordion,
  H4,
} from "@bootstrap-styled/v4";
import { Swatch } from "./reusable/Swatch.js";
import { useQuery } from "react-query";
import { ColorContext } from "./ColorProvider.js";

export const Detail = ({ ...props }) => {
  const { color, getColorInfo, KEYS } = useContext(ColorContext);
  const [activeAccordion, setActiveAccordion] = useState("RGB");
  const colorInfo = useQuery(
    [KEYS.CURRENT_COLOR_INFO, color],
    () => getColorInfo(color),
    {
      // since a color's info will never change (even though the queried color will change)
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  const LabelledItem = ({ label, data, separator }) => {
    separator = separator || ":";
    if (!colorInfo.data) {
      return `...loading ${label}...`;
    } else {
      return <ListGroupItem>{`${label}${separator} ${data}`}</ListGroupItem>;
    }
  };

  return (
    <>
      <Col>
        <Swatch
          color={color}
          size={20}
          style={{ margin: "auto", marginTop: "10%" }}
        />
        <H4 style={{ textAlign: "center", marginTop: "5%" }}>{color}</H4>
      </Col>
      <Col>
        <AccordionGroup
          activeAccordionName={activeAccordion}
          onChange={setActiveAccordion}
          style={{ paddingRight: "8%" }}
        >
          <Accordion
            heading={
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>RGB</div>
                {activeAccordion === "RGB" && (
                  <div
                    style={{
                      textAlign: "right",
                      margin: "auto",
                      marginRight: 0,
                    }}
                    children={color}
                  />
                )}
              </div>
            }
            name="RGB"
          >
            <ListGroup>
              <LabelledItem
                label="Red"
                data={colorInfo?.data && colorInfo.data.rgb.rgb_r}
              />
              <LabelledItem
                label="Green"
                data={colorInfo?.data && colorInfo.data.rgb.rgb_g}
              />
              <LabelledItem
                label="Blue"
                data={colorInfo?.data && colorInfo.data.rgb.rgb_b}
              />
            </ListGroup>
          </Accordion>
          <Accordion heading="HSV" name="HSV">
            <ListGroup>
              <LabelledItem
                label="Hue"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsv.hsv_h.toFixed(2))
                }
              />
              <LabelledItem
                label="Saturation"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsv.hsv_s.toFixed(2))
                }
              />
              <LabelledItem
                label="Value"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsv.hsv_v.toFixed(2))
                }
              />
            </ListGroup>
          </Accordion>
          <Accordion heading="HSL" name="HSL">
            <ListGroup>
              <LabelledItem
                label="Hue"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsl.hsl_h.toFixed(2))
                }
              />
              <LabelledItem
                label="Saturation"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsl.hsl_s.toFixed(2))
                }
              />
              <LabelledItem
                label="Lightness"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsl.hsl_l.toFixed(2))
                }
              />
            </ListGroup>
          </Accordion>
          <Accordion heading="CIELAB" name="LAB">
            <ListGroup>
              <LabelledItem
                label="L*"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.lab.lab_l.toFixed(2))
                }
              />
              <LabelledItem
                label="a*"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.lab.lab_a.toFixed(2))
                }
              />
              <LabelledItem
                label="b*"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.lab.lab_b.toFixed(2))
                }
              />
            </ListGroup>
          </Accordion>
          <Accordion heading="CIEXYZ" name="XYZ">
            <ListGroup>
              <LabelledItem
                label="X"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.xyz.xyz_x.toFixed(2))
                }
              />
              <LabelledItem
                label="Y"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.xyz.xyz_y.toFixed(2))
                }
              />
              <LabelledItem
                label="Z"
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.xyz.xyz_z.toFixed(2))
                }
              />
            </ListGroup>
          </Accordion>
        </AccordionGroup>
      </Col>
    </>
  );
};
