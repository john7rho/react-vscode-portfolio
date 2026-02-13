import React, { memo, useCallback } from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import { VscFiles } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";

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
        background: "#000000",
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
