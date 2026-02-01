import React, { memo, useCallback } from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import { keyframes } from "@mui/system";
import { VscFiles } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";

const floatUp = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
`;

const ASCII_SYMBOLS = [
  { char: "*", left: "15%", delay: "0s", duration: "12s", size: "18px" },
  { char: "+", left: "30%", delay: "2s", duration: "15s", size: "14px" },
  { char: "#", left: "50%", delay: "4s", duration: "18s", size: "16px" },
  { char: "~", left: "70%", delay: "1s", duration: "14s", size: "20px" },
  { char: "@", left: "85%", delay: "6s", duration: "16s", size: "12px" },
  { char: "^", left: "25%", delay: "8s", duration: "13s", size: "15px" },
  { char: "%", left: "60%", delay: "3s", duration: "17s", size: "14px" },
  { char: "&", left: "40%", delay: "5s", duration: "11s", size: "16px" },
  { char: "$", left: "75%", delay: "7s", duration: "19s", size: "13px" },
  { char: "!", left: "10%", delay: "9s", duration: "14s", size: "17px" },
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
              bottom: 0,
              left: sym.left,
              color: "rgba(255, 255, 255, 0.4)",
              fontFamily: "monospace",
              fontSize: sym.size,
              lineHeight: 1,
              textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
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
