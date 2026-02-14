import { lazy, Suspense, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import AsciiBackground from "../components/AsciiBackground";

const GitHubCalendar = lazy(() => import("react-github-calendar"));

const GitHubGraph = ({ username, isMobile }: { username: string; isMobile: boolean }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        border: "1px solid rgba(192, 192, 192, 0.12)",
        borderRadius: "6px",
        padding: isMobile ? "4px" : "8px",
        backgroundColor: "transparent",
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              height: isMobile ? 80 : 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            Loading contributions...
          </Box>
        }
      >
        <GitHubCalendar
          username={username}
          colorScheme="dark"
          {...{
            theme: {
              level0: "#161b22",
              level1: "#0b3d5b",
              level2: "#0e6fa0",
              level3: "#1a9fd4",
              level4: "#40c4ff",
            },
          }}
        />
      </Suspense>
    </Box>
  );
};

interface Props {
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

export default function Home({ setSelectedIndex }: Props) {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setSelectedIndex(-1);
  }, [setSelectedIndex]);

  const [lastCommit, setLastCommit] = useState<string | null>(null);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  useEffect(() => {
    fetch("https://api.github.com/repos/john7rho/react-vscode-portfolio/commits?per_page=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const date = new Date(data[0].commit.author.date);
          setLastCommit(
            date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <AsciiBackground />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: `calc(100vh - 20px - 33px)`, px: isMobile ? 2 : 0 }}
      >
      <Grid item xs={3}>
        <Stack direction={{ xs: "column", sm: "row-reverse" }} spacing={2}>
          <Box>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography variant={isMobile ? "h4" : "h3"}>{process.env.REACT_APP_NAME}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
              sx={{ textAlign: isMobile ? "center" : "left" }}
            >
              <Typography variant={isMobile ? "body2" : "subtitle1"} gutterBottom>
                Harvard alumnus | Technical Staff @{" "}
                <Link
                  href="https://datacurve.ai"
                  target="_blank"
                  underline="hover"
                  color="inherit"
                >
                  datacurve.ai
                </Link>
              </Typography>
            </Grid>

            <Box
              mt={2}
              sx={{ width: "100%", maxWidth: isMobile ? "100%" : "600px", margin: "0 auto" }}
            >
              <GitHubGraph username="john7rho" isMobile={isMobile} />
            </Box>

            {lastCommit && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 3,
                  color: "rgba(192, 192, 192, 0.4)",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                Last commit: {lastCommit}
              </Typography>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
    </>
  );
}
