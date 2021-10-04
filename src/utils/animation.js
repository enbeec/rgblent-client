import { css } from "styled-components";

// TODO look into styled-components keyframes partials
const makeFrames = (name, keyframesString) => css`
  @-webkit-keyframes ${name} {
    ${keyframesString}
  }

  @-moz-keyframes ${name} {
    ${keyframesString}
  }

  @-o-keyframes ${name} {
    ${keyframesString}
  }

  @keyframes ${name} {
    ${keyframesString}
  }
`;

const makeAnimation = ({
  duration = null,
  easing = null,
  delay = null,
  count = null,
  direction = null,
  fillMode = null,
  name = null,
}) => css`
	-webkit-animation: ${[duration, easing, delay, count, direction, fillMode, name]
    .filter(Boolean)
    .join(" ")};,

	-z-animation: ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};

	-o-animation: ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};

	animation:        ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};
`;

export const RainbowBackground = ({ brightLimit = false, alpha = 1 }) => css`
  background: linear-gradient(
    124deg,
    #ff2400,
    ${brightLimit ? "" : "#e81d1d, #e8b71d, #e3e81d,"} #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );

  background-size: 1800% 1800%;

  ${makeFrames(
    "rainbow",
    css`
      0% {
        background-position: 0% 82%;
      }
      50% {
        background-position: 100% 19%;
      }
      100% {
        background-position: 0% 82%;
      }
    `
  )}

  ${makeAnimation({
    name: "rainbow",
    direction: "alternate",
    duration: "18s",
    easing: "ease",
    count: "infinite",
  })}
`;

export const RippleBackground = () => css`
  background: linear-gradient(
    62deg,
    #ff2400,
    /* TODO factor this out as the "ripple color" */ #efefef,
    #1de840,
    /* TODO factor this out as the "ripple color" */ #efefef,
    #1ddde8,
    /* TODO factor this out as the "ripple color" */ #efefef,
    #2b1de8,
    /* TODO factor this out as the "ripple color" */ #efefef,
    #dd00f3,
    /* TODO factor this out as the "ripple color" */ #efefef,
    #dd00f3
  );

  background-size: 1800% 1800%;

  ${makeFrames(
    "ripple",
    css`
      0% {
        background-position: 0% 82%;
      }
      50% {
        background-position: 100% 19%;
      }
      100% {
        background-position: 0% 82%;
      }
    `
  )}
  ${makeAnimation({
    name: "ripple",
    direction: "alternate",
    duration: "18s",
    easing: "ease",
    count: "infinite",
  })}
`;
