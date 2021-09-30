import React, { useState } from "react";
import styled from "styled-components";
import {
  H4,
  Row,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
  Tooltip,
  Input,
  Badge as BADGE,
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
      <Card>
        <CardHeader>
          <FlexRow>
            <div>{paletteColor.label}</div>
            <Badge className="user-select-none" children={"✖"} color="danger" />
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
  margin-right: 1rem;
`;

const Button = styled(BUTTON)`
  width: 6rem;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
`;

const Badge = styled(BADGE)`
  justify-self: right;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid black;
  user-select: none;

  :hover {
    box-shadow: -2px 2px 1px darkgrey;
  }

  :active {
    box-shadow: -1px 1px 1px darkgrey;
    border: 3px solid black;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0%;
  margin-right: 0%;
`;
