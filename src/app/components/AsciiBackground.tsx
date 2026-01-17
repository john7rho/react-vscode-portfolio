import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import getAsciiImage from "get-ascii-image";

const AsciiBackground = () => {
  const [ascii, setAscii] = useState<string>("");

  useEffect(() => {
    getAsciiImage("/sf-cityscape.jpg", {
      maxWidth: 2500,
    })
      .then(setAscii)
      .catch(console.error);
  }, []);

  if (!ascii) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.25,
        fontFamily: "monospace",
        fontSize: "2px",
        lineHeight: 1.0,
        whiteSpace: "pre",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
      }}
    >
      {ascii}
    </Box>
  );
};

export default AsciiBackground;
