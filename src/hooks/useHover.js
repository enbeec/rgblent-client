import { useState, useCallback, useRef } from "react";

// https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f

export const useHover = () => {
  const [hoverState, setHoverState] = useState(false);

  const handleMouseOver = useCallback(() => {
    setHoverState(true);
  }, []);
  const handleMouseOut = useCallback(() => {
    setHoverState(false);
  }, []);

  const ref = useRef();

  const hoverRef = useCallback(
    (domNode) => {
      if (ref.current) {
        ref.current.removeEventListener("mouseover", handleMouseOver);
        ref.current.removeEventListener("mouseout", handleMouseOut);
      }

      ref.current = domNode;

      if (ref.current) {
        ref.current.addEventListener("mouseover", handleMouseOver);
        ref.current.addEventListener("mouseout", handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [hoverRef, hoverState];
};
