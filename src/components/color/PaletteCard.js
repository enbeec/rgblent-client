import React, { useRef, useState } from "react";
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

export const PaletteCard = ({
  label,
  labelIsDirtyFunc,
  colorIsDirtyFunc,
  saveLabelFunc,
  saveColorFunc,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const editButtonId = "palette-color__editbutton-" + props.index;
  const labelRef = useRef(null);

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    saveLabelFunc(labelRef.current.value);
    setIsEditing(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <FlexRow>
            {isEditing ? (
              <Input defaultValue={label} ref={labelRef} />
            ) : (
              <div>
                {label}
                {labelIsDirtyFunc() && "*"}
              </div>
            )}
            <Badge className="user-select-none" children={"✖"} color="danger" />
          </FlexRow>
        </CardHeader>
        <Swatch
          {...props}
          size={12}
          style={{
            margin: "auto",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
          //color={displayedColor}
          dropdownExtras={
            [
              //   { children: "View Details", onClick: setDetailColor },
            ]
          }
          //onDoubleClick={setDetailColor}
        />
        <CardFooter>
          <FlexRow>
            {colorIsDirtyFunc() || labelIsDirtyFunc() ? (
              <>
                <Button>Replace</Button>
                <Button>Save</Button>
              </>
            ) : (
              <>
                <Button id={editButtonId} disabled={isNobody()}>
                  Edit
                </Button>
                {isNobody() && (
                  <Tooltip
                    isOpen={openTooltip}
                    toggle={() => setOpenTooltip(!openTooltip)}
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
                  #hexhex
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0%;
  margin-right: 0%;
`;
