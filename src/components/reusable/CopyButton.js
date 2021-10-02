import React, { useState } from "react";
import { Button, Tooltip } from "@bootstrap-styled/v4";
import { useTimeoutFn } from "react-use";
import { useHover } from "../../hooks/useHover.js";

export const CopyButton = ({ ButtonComponent, id, timeout, ...props }) => {
  const [hoverRef, hoverState] = useHover();
  const [copySuccess, setCopySuccess] = useState(null);
  const [, , tooltipReset] = useTimeoutFn(() => {
    setCopySuccess(null);
  }, timeout || 1800);

  const copyToClipboard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
      tooltipReset();
    } catch (err) {
      setCopySuccess("Failed to copy!");
      tooltipReset();
    }
  };

  ButtonComponent = ButtonComponent || Button;

  return (
    <>
      <div ref={hoverRef}>
        <ButtonComponent
          id={id}
          color="secondary"
          onClick={() => copyToClipboard(props.children)}
        >
          {props.children}
        </ButtonComponent>
      </div>
      <Tooltip target={id} isOpen={!!copySuccess}>
        {copySuccess}
      </Tooltip>
      <Tooltip target={id} isOpen={!copySuccess && hoverState}>
        Click to copy!
      </Tooltip>
    </>
  );
};
