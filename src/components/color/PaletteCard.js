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
import { FlexRow } from "./Palette.js";
import { CopyButton } from "../reusable/CopyButton.js";
import { Swatch } from "../color/Swatch.js";
import { isNobody } from "../../utils/auth.js";

export const PaletteCard = ({
  color,
  label,
  labelIsDirtyFunc,
  colorIsDirtyFunc,
  saveLabelFunc,
  saveColorFunc,
  detailColor,
  setDetailColorFunc,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newColor, setNewColor] = useState(null);
  const [newLabel, setNewLabel] = useState(null);
  const [openTooltip, setOpenTooltip] = useState(null);
  const editButtonId = "palette-color__editbutton-" + props.index;
  const detailDropdownItemId = "palette-color__detailitem-" + props.index;

  const startEditing = () => {
    setNewColor(null); // just in case something weird happens
    setNewLabel(label);
    setIsEditing(true);
  };

  const endEditing = () => {
    if (newLabel !== label) saveLabelFunc(newLabel);
    if (newColor) saveColorFunc(newColor);
    setNewColor(null);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setNewColor(null);
    setIsEditing(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <FlexRow style={{ padding: 0 }}>
            {isEditing ? (
              <>
                <Input
                  defaultValue={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
                <Badge
                  className="user-select-none"
                  children={"✖"}
                  color="danger"
                  onClick={cancelEditing}
                />
              </>
            ) : (
              <div>
                {label}
                {(labelIsDirtyFunc() || colorIsDirtyFunc()) && "*"}
              </div>
            )}
          </FlexRow>
        </CardHeader>
        <Swatch
          size={16}
          squish="vertical"
          style={{
            margin: "1rem",
            marginTop: "0.5rem",
            marginBottom: "0.8rem",
          }}
          color={!!newColor && isEditing ? newColor : color}
          dropdownExtras={[
            // DO NOT let them set the detail while editing
            {
              children: "View Details",
              onClick: setDetailColorFunc,
              disabled: isEditing,
              id: detailDropdownItemId,
            },
          ]}
          // DO NOT let them set the detail while editing
          onDoubleClick={isEditing ? () => {} : setDetailColorFunc}
          // passing through a Tooltip with my custom DropdownItem
          sibling={
            isEditing && (
              <Tooltip
                isOpen={openTooltip === detailDropdownItemId}
                toggle={() =>
                  setOpenTooltip(
                    openTooltip === null ? detailDropdownItemId : null
                  )
                }
                target={detailDropdownItemId}
                placement="right"
              >
                Not available while editing.
              </Tooltip>
            )
          }
        />
        <CardFooter>
          <FlexRow>
            {isEditing ? (
              <>
                <Button onClick={() => setNewColor(detailColor)} color="info">
                  Replace
                </Button>
                <Button onClick={endEditing} color="success">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  id={editButtonId}
                  disabled={isNobody()}
                  onClick={startEditing}
                  color="info"
                >
                  Edit
                </Button>
                {isNobody() && (
                  <Tooltip
                    isOpen={openTooltip}
                    toggle={() =>
                      setOpenTooltip(openTooltip === null ? editButtonId : null)
                    }
                    target={editButtonId}
                    placement="top"
                  >
                    Login/Register to edit palettes
                  </Tooltip>
                )}
                <CopyButton
                  id={`palette-color__copy-button-${props.index}`}
                  ButtonComponent={Button}
                >
                  {color.toUpperCase()}
                </CopyButton>
              </>
            )}
          </FlexRow>
        </CardFooter>
      </Card>
    </>
  );
};

const Card = styled(CARD)`
  margin-bottom: 4%;
  width: 46%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
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
  border: 2px solid darkgrey;
  user-select: none;

  :hover {
    box-shadow: -2px 2px 1px lightgrey;
  }

  :active {
    box-shadow: -1px 1px 1px lightgrey;
    border: 3px solid darkgrey;
  }
`;
