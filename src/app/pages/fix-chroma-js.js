import chroma from "chroma-js";

if (chroma.default) {
  chroma.scale = chroma.default.scale;
}

export default chroma;
