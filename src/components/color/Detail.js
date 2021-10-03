import React, { useState, useContext } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  AccordionGroup,
  Accordion,
  H4,
} from "@bootstrap-styled/v4";
import { Swatch } from "./Swatch.js";
import { useQuery } from "react-query";
import { ColorContext } from "./ColorProvider.js";
import { KEYS } from "../../utils/query.js";
import { CopyButton } from "../reusable/CopyButton.js";

export const Detail = ({ ...props }) => {
  const { color, getColorInfo } = useContext(ColorContext);
  const [activeAccordion, setActiveAccordion] = useState("RGB");
  const colorInfo = useQuery(
    [KEYS.CURRENT_COLOR_INFO, color],
    () => getColorInfo(color),
    {
      // since a color's info will never change (even though the queried color will change)
      staleTime: Infinity,
    }
  );

  const LabelledItem = ({ isFetching, label, data, separator }) => {
    separator = separator || ":";
    return (
      <ListGroupItem>
        {isFetching
          ? `${label}${separator} ...loading...`
          : `${label}${separator} ${data}`}
      </ListGroupItem>
    );
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
                isFetching={colorInfo.isFetching}
                data={colorInfo?.data && colorInfo.data.rgb.rgb_r}
              />
              <LabelledItem
                label="Green"
                isFetching={colorInfo.isFetching}
                data={colorInfo?.data && colorInfo.data.rgb.rgb_g}
              />
              <LabelledItem
                label="Blue"
                isFetching={colorInfo.isFetching}
                data={colorInfo?.data && colorInfo.data.rgb.rgb_b}
              />
            </ListGroup>
          </Accordion>
          <Accordion heading="HSV" name="HSV">
            <ListGroup>
              <LabelledItem
                label="Hue"
                isFetching={colorInfo.isFetching}
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsv.hsv_h.toFixed(2))
                }
              />
              <LabelledItem
                label="Saturation"
                isFetching={colorInfo.isFetching}
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsv.hsv_s.toFixed(2))
                }
              />
              <LabelledItem
                label="Value"
                isFetching={colorInfo.isFetching}
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
                isFetching={colorInfo.isFetching}
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsl.hsl_h.toFixed(2))
                }
              />
              <LabelledItem
                label="Saturation"
                isFetching={colorInfo.isFetching}
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.hsl.hsl_s.toFixed(2))
                }
              />
              <LabelledItem
                label="Lightness"
                isFetching={colorInfo.isFetching}
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
                isFetching={colorInfo.isFetching}
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.lab.lab_l.toFixed(2))
                }
              />
              <LabelledItem
                label="a*"
                isFetching={colorInfo.isFetching}
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.lab.lab_a.toFixed(2))
                }
              />
              <LabelledItem
                label="b*"
                isFetching={colorInfo.isFetching}
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
                isFetching={colorInfo.isFetching}
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.xyz.xyz_x.toFixed(2))
                }
              />
              <LabelledItem
                label="Y"
                isFetching={colorInfo.isFetching}
                separator=" =>"
                data={
                  colorInfo?.data &&
                  parseFloat(colorInfo.data.xyz.xyz_y.toFixed(2))
                }
              />
              <LabelledItem
                label="Z"
                isFetching={colorInfo.isFetching}
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
