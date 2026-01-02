import {
  Container,
  createTheme,
  CssBaseline,
  darkScrollbar,
  Grid,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import AppTree from "./AppTree";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AppButtons from "./AppButtons";
import { pages } from "../pages/pages";
import usePageTracking from "../hooks/usePageTracking";
import { isBrowser } from "react-device-detect";

const Home = lazy(() => import("../pages/Home"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const MDContainer = lazy(() => import("../components/MDContainer"));
const NoteContainer = lazy(() => import("../components/NoteContainer"));

interface Page {
  index: number;
  name: string;
  route: string;
}

function initVisiblePageIndexs(pages: Page[]) {
  const tabs = [];
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    tabs.push(page.index);
  }
  return tabs;
}

export default function App() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(isBrowser);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentComponent, setCurrentComponent] = useState("");
  const [visiblePageIndexs, setVisiblePageIndexs] = useState(
    initVisiblePageIndexs(pages)
  );
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const currentTheme = window.localStorage.getItem("theme");
    if (!currentTheme) {
      return true;
    }
    return currentTheme === "dark";
  });
  const [visiblePages, setVisiblePages] = useState(pages);
  const paletteType = darkMode ? "dark" : "light";
  usePageTracking();

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 600,
          h1: {
            fontWeight: 600,
            letterSpacing: "-0.02em",
          },
          h2: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          h3: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          body1: {
            fontWeight: 400,
            letterSpacing: "0.01em",
          },
          body2: {
            fontWeight: 400,
            letterSpacing: "0.01em",
          },
        },
        palette: {
          mode: paletteType,
          background: {
            default: paletteType === "light" ? "#FFFFFF" : "#1e1e1e",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                ...(paletteType === "dark" ? darkScrollbar() : null),
                backgroundImage:
                  paletteType === "light"
                    ? "linear-gradient(120deg, #f6f8fa 0%, #e7eaf0 100%)"
                    : "linear-gradient(120deg, #1e1e1e 0%, #2d2d2d 100%)",
                backgroundAttachment: "fixed",
              },
              html: {
                backgroundColor: paletteType === "light" ? "#f6f8fa" : "#1e1e1e",
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: "rgba(255, 255, 255, 0.12)",
              },
            },
          },
        },
      }),
    [paletteType]
  );

  const handleThemeChange = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next ? "dark" : "light");
      }
      return next;
    });
  }, []);

  const deletedIndex = visiblePages.find(
    (x) => !visiblePageIndexs.includes(x.index)
  )?.index;

  useEffect(() => {
    const newPages = [];

    for (const index of visiblePageIndexs) {
      const page = pages.find((x) => x.index === index);
      if (page) newPages.push(page);
    }
    setVisiblePages(newPages);

    if (visiblePageIndexs.length === 0) {
      setSelectedIndex(-1);
      navigate("/");
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex > Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.max(...visiblePageIndexs));
      const page = pages.find(
        (x) => x.index === Math.max(...visiblePageIndexs)
      );
      if (page) navigate(page.route);
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex < Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.min(...visiblePageIndexs));
      const page = pages.find(
        (x) => x.index === Math.min(...visiblePageIndexs)
      );
      if (page) navigate(page.route);
    } else {
    }
  }, [visiblePageIndexs, navigate, deletedIndex, selectedIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container
        sx={{
          m: 0,
          p: 0,
          overflowY: "hidden",
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1,
        }}
        maxWidth={false}
        disableGutters
      >
        <Grid container sx={{ overflow: "auto", overflowY: "hidden" }}>
          <Grid container sx={{ overflow: "auto" }}>
            <Grid item sx={{ width: 50 }}>
              <Sidebar
                setExpanded={setExpanded}
                expanded={expanded}
                darkMode={darkMode}
                handleThemeChange={handleThemeChange}
                setSelectedIndex={setSelectedIndex}
                setCurrentComponent={setCurrentComponent}
                visiblePageIndexs={visiblePageIndexs}
                setVisiblePageIndexs={setVisiblePageIndexs}
              />
            </Grid>
            {expanded && (
              <Grid
                item
                sx={{
                  backgroundColor: darkMode ? "#252527" : "#f3f3f3",
                  width: 220,
                }}
              >
                <Stack sx={{ mt: 1 }}>
                  <AppTree
                    pages={pages}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    currentComponent={currentComponent}
                    setCurrentComponent={setCurrentComponent}
                    visiblePageIndexs={visiblePageIndexs}
                    setVisiblePageIndexs={setVisiblePageIndexs}
                  />
                </Stack>
              </Grid>
            )}

            <Grid item xs zeroMinWidth>
              <Grid
                sx={{
                  height: "33px",
                }}
              >
                <AppButtons
                  // pages={pages}
                  pages={visiblePages}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  currentComponent={currentComponent}
                  setCurrentComponent={setCurrentComponent}
                  visiblePageIndexs={visiblePageIndexs}
                  setVisiblePageIndexs={setVisiblePageIndexs}
                />
              </Grid>

              <Grid
                sx={{
                  scrollBehavior: "smooth",
                  // overflow: 'scroll',
                  overflowY: "auto",
                  height: `calc(100vh - 20px - 33px)`,
                }}
              >
                <Suspense
                  fallback={
                    <Stack
                      sx={{ height: "100%", py: 4 }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      Loading...
                    </Stack>
                  }
                >
                  <Routes>
                    <Route
                      path="/"
                      element={<Home setSelectedIndex={setSelectedIndex} />}
                    />
                    {pages.map(({ index, name, route }) => {
                      if (route === "/settings") {
                        return (
                          <Route
                            key={index}
                            path={route}
                            element={<SettingsPage />}
                          />
                        );
                      }
                      return (
                        <Route
                          key={index}
                          path={route}
                          element={<MDContainer path={`/pages/${name}`} />}
                        />
                      );
                    })}
                    <Route
                      path="/notes/:noteId"
                      element={<NoteContainer />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
      {/* </Router> */}
    </ThemeProvider>
  );
}
