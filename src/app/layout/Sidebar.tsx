import React, { memo, useCallback, useMemo } from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import { keyframes } from "@mui/system";
import { VscFiles, VscSettingsGear } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";
import { useNavigate } from "react-router-dom";

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(100%) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
`;

const shine = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(2); }
  100% { filter: brightness(1); }
`;

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  handleThemeChange: () => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
  visiblePageIndexs: number[];
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

function Sidebar({
  expanded,
  setExpanded,
  darkMode,
  handleThemeChange,
  setSelectedIndex,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();

  const handleToggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, [setExpanded]);

  const handleSettingsClick = useCallback(() => {
    if (!visiblePageIndexs.includes(6)) {
      const newIndexs = [...visiblePageIndexs, 6];
      setVisiblePageIndexs(newIndexs);
    }
    navigate("/settings");
    setSelectedIndex(6);
    setCurrentComponent("sidebar");
  }, [
    visiblePageIndexs,
    setVisiblePageIndexs,
    navigate,
    setSelectedIndex,
    setCurrentComponent,
  ]);

  const bubbleStyles = useMemo(
    () =>
      expanded
        ? {
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              left: "50%",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              animation: `${bubbleAnimation} 15s infinite ease-in-out`,
            },
            "&::before": {
              left: "25%",
              animationDelay: "2s",
            },
            "&::after": {
              left: "75%",
              width: "20px",
              height: "20px",
              animationDelay: "5s",
            },
          }
        : {},
    [expanded]
  );

  return (
    <Box
      sx={{
        height: `calc(100vh - 20px)`,
        background: `radial-gradient(circle at center, #001f3f, #000814)`,
        position: "relative",
        overflow: "hidden",
        ...bubbleStyles,
      }}
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
      component={Paper}
      square
      elevation={0}
    >
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
              : darkMode
              ? "solid 0.12em #333333"
              : "solid 0.12em #2c2c2c",
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

      <Box
        sx={{ flexGrow: 0, pb: 0.5 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Tooltip
          title={darkMode ? "Turn on the light" : "Turn off the light"}
          placement="right"
          arrow
        >
          <Box
            sx={{
              flexGrow: 0,
              fontSize: 24,
              color: "#858585",
              cursor: "pointer",
              "&:hover": {
                color: "white",
              },
              WebkitTapHighlightColor: "rgba(0,0,0,0)",
            }}
            display="flex"
            justifyContent="center"
            onClick={handleThemeChange}
          >
            {!darkMode ? (
              <Box>
                <MdDarkMode />
              </Box>
            ) : (
              <Box>
                <MdLightMode />
              </Box>
            )}
          </Box>
        </Tooltip>
        <Box
          sx={{
            flexGrow: 0,
            fontSize: 24,
            color: "#858585",
            cursor: "pointer",
            "&:hover": {
              color: "white",
            },
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
          }}
          display="flex"
          justifyContent="center"
          onClick={handleSettingsClick}
        >
          <Box
            mt={0.7}
            sx={{
              animation: `${shine} 2s infinite`,
            }}
          >
            <VscSettingsGear />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
