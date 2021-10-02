export const DEFAULT_PALETTE = {
  // just the necessary placeholder parts
  name: "default",
  colors: [
    {
      label: "yellow-orange",
      color: { rgb_hex: "#FFDF80" },
    },
    {
      label: "yellow-green",
      color: { rgb_hex: "#BFFF80" },
    },
    {
      label: "green",
      color: { rgb_hex: "#80FF9F" },
    },
    {
      label: "cyan",
      color: { rgb_hex: "#80FFFF" },
    },
    {
      label: "blue",
      color: { rgb_hex: "#809FFF" },
    },
    {
      label: "purple",
      color: { rgb_hex: "#BF80FF" },
    },
    {
      label: "pink",
      color: { rgb_hex: "#FF80DF" },
    },
    {
      label: "red",
      color: { rgb_hex: "#FF8080" },
    },
  ],
};

// https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
export const rgbInts = (rgb_hex) => ({
  r: parseInt(rgb_hex.slice(1, 3), 16),
  g: parseInt(rgb_hex.slice(3, 5), 16),
  b: parseInt(rgb_hex.slice(5, 7), 16),
});

export const findL = (rgb_hex) => {
  const { r, g, b } = rgbInts(rgb_hex);
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const findRatio = (L1, L2) => {
  const [small, big] = [L1, L2].sort((a, b) => a - b);
  return small + 0.5 / big + 0.5;
};

export const darkText = "#010101";
export const darkL = findL(darkText);
export const lightText = "#fefefe";
export const lightL = findL(lightText);
