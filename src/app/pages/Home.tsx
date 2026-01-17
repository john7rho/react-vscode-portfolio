import { lazy, Suspense, useEffect, type Dispatch, type SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Link, Stack, Typography, useMediaQuery } from "@mui/material";

const GitHubCalendar = lazy(() => import("react-github-calendar"));

const GitHubGraph = ({ username, isMobile }: { username: string; isMobile: boolean }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        border: "1px solid rgba(255, 255, 255, 0.1)",
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

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  return (
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
                Recent Harvard Graduate | Technical Staff @{" "}
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
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
