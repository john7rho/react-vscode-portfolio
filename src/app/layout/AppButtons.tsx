import { Button, Box, Paper } from "@mui/material";
import React, { memo, useMemo, useCallback } from "react";
import { VscMarkdown, VscChromeClose, VscSettingsGear } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";

interface Props {
  pages: {
    index: number;
    name: string;
    route: string;
  }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: string;
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
  visiblePageIndexs: number[];
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

function AppButtons({
  pages,
  selectedIndex,
  setSelectedIndex,
  currentComponent,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getStyles = useCallback(
    (index: number) => {
      const isSelected = selectedIndex === index;
      return {
        buttonBg: isDark
          ? isSelected
            ? "#1e1e1e"
            : "#2d2d2d"
          : isSelected
          ? "#ffffff"
          : "#ececec",
        buttonColor: isDark
          ? isSelected
            ? "white"
            : "#817d7a"
          : isSelected
          ? "#524a5f"
          : "#716f74",
        closeButtonBg: isDark
          ? isSelected
            ? "#1e1e1e"
            : "#2d2d2d"
          : isSelected
          ? "#ffffff"
          : "#ececec",
        closeButtonColor: isDark
          ? isSelected
            ? "white"
            : "#2d2d2d"
          : isSelected
          ? "#72736d"
          : "#ececec",
        closeButtonHoverBg: isDark
          ? "#333c43"
          : isSelected
          ? "#e6e4e5"
          : "#dadada",
        closeButtonHoverColor: isDark
          ? isSelected
            ? "white"
            : "#817d7a"
          : isSelected
          ? "#44434b"
          : "#92938e",
      };
    },
    [isDark, selectedIndex]
  );

  const handleButtonClick = useCallback(
    (index: number, route: string) => {
      setSelectedIndex(index);
      setCurrentComponent("button");
      navigate(route);
    },
    [setSelectedIndex, setCurrentComponent, navigate]
  );

  const handleCloseClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      setVisiblePageIndexs(visiblePageIndexs.filter((x) => x !== index));
    },
    [visiblePageIndexs, setVisiblePageIndexs]
  );

  const borderColor = isDark ? "#252525" : "#f3f3f3";

  const renderedButtons = useMemo(
    () =>
      pages.map(({ index, name, route }) => {
        const styles = getStyles(index);
        const getFileIcon = () => {
          if (route === "/settings") {
            return <VscSettingsGear />;
          }
          return <VscMarkdown />;
        };

        return (
          <Box
            key={index}
            sx={{
              display: "inline-block",
              borderRight: 1,
              borderColor: borderColor,
            }}
          >
            <Button
              key={index}
              disableRipple
              disableElevation
              disableFocusRipple
              onClick={() => handleButtonClick(index, route)}
              sx={{
                borderRadius: 0,
                px: 2,
                textTransform: "none",
                backgroundColor: styles.buttonBg,
                color: styles.buttonColor,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: styles.buttonBg,
                },
                transition: "none",
                pb: 0.2,
              }}
            >
              <Box
                sx={{ color: "#6997d5", width: 20, height: 20, mr: 0.4, ml: -1 }}
              >
                {getFileIcon()}
              </Box>
              {name}
              <Box
                component={Paper}
                sx={{
                  ml: 1,
                  mr: -1,
                  backgroundColor: styles.closeButtonBg,
                  color: styles.closeButtonColor,
                  "&.MuiPaper-root:hover": {
                    bgcolor: styles.closeButtonHoverBg,
                    color: styles.closeButtonHoverColor,
                  },
                  width: 20,
                  height: 20,
                  transition: "none",
                }}
                elevation={0}
                onClick={(e: React.MouseEvent) => handleCloseClick(e, index)}
              >
                <VscChromeClose />
              </Box>
            </Button>
          </Box>
        );
      }),
    [pages, getStyles, borderColor, handleButtonClick, handleCloseClick]
  );

  const containerBgColor = isDark ? "#252527" : "#f3f3f3";
  const scrollbarThumbColor = isDark ? "#535353" : "#8c8c8c";

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "inline-block",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: containerBgColor,
        "&::-webkit-scrollbar": {
          height: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: scrollbarThumbColor,
        },
        "&::-webkit-darkScrollbar-thumb": {
          backgroundColor: isDark ? "#ffffff" : "#8c8c8c",
        },
      }}
    >
      {renderedButtons}
    </Container>
  );
}

export default memo(AppButtons);
