import React, { memo, useCallback } from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import { keyframes } from "@mui/system";
import { VscFiles } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";

const floatUp = keyframes`
  0% {
    transform: translateX(-50%) translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    transform: translateX(-50%) translateY(-60vh) rotate(360deg);
    opacity: 0;
  }
`;

const ASCII_SYMBOLS = [
  { char: "*", bottom: "0%", delay: "0s", duration: "14s", size: "16px" },
  { char: "+", bottom: "20%", delay: "4s", duration: "16s", size: "14px" },
  { char: "#", bottom: "40%", delay: "8s", duration: "18s", size: "15px" },
  { char: "~", bottom: "60%", delay: "2s", duration: "15s", size: "14px" },
  { char: "@", bottom: "80%", delay: "6s", duration: "17s", size: "13px" },
];

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({
  expanded,
  setExpanded,
}: Props) {
  const handleToggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  return (
    <Box
      sx={{
        height: `calc(100vh - 20px)`,
        background: `radial-gradient(circle at center, #001f3f, #000814)`,
        position: "relative",
        overflow: "hidden",
      }}
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
      component={Paper}
      square
      elevation={0}
    >
      {/* Floating ASCII symbols */}
      {expanded &&
        ASCII_SYMBOLS.map((sym, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              bottom: sym.bottom,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255, 255, 255, 0.15)",
              fontFamily: "monospace",
              fontSize: sym.size,
              lineHeight: 1,
              textShadow: "0 0 6px rgba(255, 255, 255, 0.2)",
              animation: `${floatUp} ${sym.duration} ${sym.delay} infinite ease-in-out`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {sym.char}
          </Box>
        ))}
      <Box
        sx={{ flexGrow: 0 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          sx={{
            borderLeft: expanded
              ? "solid 0.12em white"
              : "solid 0.12em #333333",
            cursor: "pointer",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
          }}
          onClick={handleToggleExpanded}
        >
          <Box
            sx={{
              flexGrow: 0,
              my: 1.5,
              color: expanded ? "white" : "#858585",
              fontSize: 24,
              outline: "none",
              "&:hover": {
                color: "white",
              },
            }}
            display="flex"
            justifyContent="center"
          >
            <VscFiles />
          </Box>
        </Box>
        <Tooltip title="Source of this project" arrow placement="right">
          <Link
            target="_blank"
            href={"https://github.com/john7rho/react-vscode-portfolio"}
            underline="none"
            color="inherit"
            sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          >
            <Box
              sx={{
                flexGrow: 0,
                cursor: "pointer",
                color: "#858585",
                fontSize: 24,
                "&:hover": {
                  color: "white",
                },
              }}
              display="flex"
              justifyContent="center"
            >
              <Box mt={0.7}>
                <BiGitBranch />
              </Box>
            </Box>
          </Link>
        </Tooltip>

        <Divider sx={{ m: 0.5 }} />

        {links.map((link) => (
          <Tooltip title={link.title} arrow placement="right" key={link.index}>
            <Link
              target="_blank"
              href={link.href}
              underline="none"
              color="inherit"
              sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  m: 0.5,
                  color: "#858585",
                  fontSize: 24,
                  "&:hover": {
                    color: "white",
                  },
                  cursor: "pointer",
                }}
                display="flex"
                justifyContent="center"
              >
                <Box mt={0.7}>{link.icon}</Box>
              </Box>
            </Link>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
