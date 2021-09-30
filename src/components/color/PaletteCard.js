import React, { useState } from "react";
import styled from "styled-components";
import {
  H4,
  Col,
  Row,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
  Tooltip,
  Input,
  Badge,
} from "@bootstrap-styled/v4";
import { CopyButton } from "../reusable/CopyButton.js";
import { Swatch } from "../color/Swatch.js";
import { isNobody } from "../../utils/auth.js";

export const PaletteCard = ({ setColor, colorArray, palette, ...props }) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const setDetailColor = () => setColor(colorArray[props.index]);
  const paletteColor = palette.data?.colors[props.index];
  const displayedColor = colorArray[props.index];
  const id = "palette-color-" + props.index;
  return (
    <>
      <Col style={{ margin: "auto", paddingRight: "4%" }}>
        <Card>
          <CardHeader>
            <FlexRow>
              <div>{paletteColor.label}</div>
              <Badge
                children={"new"}
                style={{ margin: "auto" }}
                color="primary"
              />
            </FlexRow>
          </CardHeader>
          <Swatch
            {...props}
            color={displayedColor}
            size={12}
            style={{
              margin: "auto",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
            dropdownExtras={[
              { children: "View Details", onClick: setDetailColor },
            ]}
            onDoubleClick={setDetailColor}
          />
          <CardFooter>
            <FlexRow>
              <Button id={id} disabled={isNobody()}>
                Edit
              </Button>
              <CopyButton
                id={`palette-color__copy-button-${props.index}`}
                ButtonComponent={Button}
              >
                {displayedColor}
              </CopyButton>
            </FlexRow>
          </CardFooter>
        </Card>
      </Col>
      {isNobody() && (
        <Tooltip
          isOpen={openTooltip}
          toggle={() => setOpenTooltip(!openTooltip)}
          target={id}
          placement="top"
        >
          Login/Register to edit palettes
        </Tooltip>
      )}
    </>
  );
};

const Card = styled(CARD)`
  margin-bottom: 4%;
  width: 16rem;
`;

const Button = styled(BUTTON)`
  width: 6rem;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
