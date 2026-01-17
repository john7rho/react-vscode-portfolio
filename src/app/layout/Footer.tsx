import { Box, Grid, Link, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  VscRemote,
  VscError,
  VscWarning,
  VscBell,
  VscFeedback,
  VscCheck,
} from "react-icons/vsc";
import { IoIosGitBranch } from "react-icons/io";
import { keyframes } from "@mui/system";

const glistenAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

export default function Footer() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      component={Paper}
      square
      elevation={0}
      sx={{
        height: "20px",
        color: "white",
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          animation: `${glistenAnimation} 5s linear infinite`,
        },
      }}
      display="flex"
    >
      <Grid container>
        <Grid
          item
          sx={{
            width: "35px",
            backgroundColor: "#2E8461",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              background: "#329171",
            },
          }}
          display="flex"
        >
          <VscRemote fontSize="0.9rem" />
        </Grid>
        <Grid
          item
          sx={{ backgroundColor: "#3279CB", width: isMobile ? "auto" : "200px", flex: isMobile ? 1 : "none" }}
          display="flex"
        >
          <Stack direction="row" spacing={0.5} sx={{ pl: 1 }}>
            <Box
              component={Link}
              href="https://github.com/noworneverev/react-vscode-portfolio"
              underline="none"
              color="white"
              target="_blank"
              display="flex"
              sx={{
                px: 0.5,
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  background: "#1f8ad2",
                },
              }}
            >
              <IoIosGitBranch fontSize="0.9rem" />
              {!isMobile && (
                <Typography sx={{ ml: 0.5, mt: 0.1, fontSize: "0.6rem" }}>
                  template GH
                </Typography>
              )}
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                px: 0.5,
                cursor: "pointer",
                "&:hover": {
                  background: "#1f8ad2",
                },
              }}
            >
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  py: 0.3,
                }}
              >
                <VscError fontSize="0.9rem" />
              </Box>
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 0.3,
                }}
              >
                <Typography sx={{ fontSize: "0.6rem" }}>0</Typography>
              </Box>

              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  py: 0.3,
                }}
              >
                <VscWarning fontSize="0.9rem" />
              </Box>
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 0.3,
                }}
              >
                <Typography sx={{ fontSize: "0.6rem" }}>0</Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        {!isMobile && (
          <Grid
            item
            sx={{ backgroundColor: "#3279CB", minWidth: `calc(100% - 235px)` }}
            display="flex"
            justifyContent="flex-end"
          >
            <Box display="flex" justifyContent="flex-end">
              <Stack
                justifyContent="end"
                direction="row"
                spacing={0.8}
                sx={{ pr: 1.5 }}
              >
                <Box
                  display="flex"
                  sx={{
                    px: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                      background: "#1f8ad2",
                    },
                  }}
                >
                  <VscCheck fontSize="0.9rem" />
                  <Typography sx={{ ml: 0.5, mt: 0.1, fontSize: "0.6rem" }}>
                    Prettier
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    py: 0.3,
                    px: 0.5,
                    cursor: "pointer",
                    "&:hover": {
                      background: "#1f8ad2",
                    },
                  }}
                >
                  <VscFeedback fontSize="0.9rem" />
                </Box>
                <Box
                  display="flex"
                  sx={{
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 0.3,
                    px: 0.5,
                    cursor: "pointer",
                    "&:hover": {
                      background: "#1f8ad2",
                    },
                  }}
                >
                  <VscBell fontSize="0.9rem" />
                </Box>
              </Stack>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
