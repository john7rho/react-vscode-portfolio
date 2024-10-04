import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import GitHubCalendar from "react-github-calendar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Define the Theme type for ActivityCalendar
type Theme = {
  level4: string;
  level3: string;
  level2: string;
  level1: string;
  level0: string;
};

// Update the customTheme object
const customTheme: Theme = {
  level0: "rgba(255, 255, 255, 0.05)",
  level1: "#0e4429",
  level2: "#006d32",
  level3: "#26a641",
  level4: "#39d353",
};

const selectLastWeek = (contributions: any[]) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    return date >= oneWeekAgo;
  });
};

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GitHubGraph: React.FC<{ username: string }> = ({ username }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "6px",
        padding: "8px",
        backgroundColor: "transparent",
      }}
    >
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        // Removed transformData prop to show full year
        // Removed hideColorLegend, hideMonthLabels, and hideTotalCount props
      />
    </Box>
  );
};

// Helper function to process GitHub events into contribution data
const processEvents = (events: any[]): ContributionDay[] => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const contributionMap = new Map<string, number>();

  events.forEach((event) => {
    const date = new Date(event.created_at);
    if (date >= oneWeekAgo) {
      const dateString = date.toISOString().split("T")[0];
      contributionMap.set(
        dateString,
        (contributionMap.get(dateString) || 0) + 1
      );
    }
  });

  const contributionData: ContributionDay[] = Array.from(
    contributionMap,
    ([date, count]) => ({
      date,
      count,
      level: Math.min(Math.floor(count / 2), 4) as 0 | 1 | 2 | 3 | 4,
    })
  );

  return contributionData;
};

interface Props {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Add this interface to define the structure of a link object
interface LinkItem {
  index: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export default function Home({ setSelectedIndex }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedIndex(-1);
  }, [setSelectedIndex]);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  // Define the links array with the proper type
  const links: LinkItem[] = [
    // Add your link objects here, for example:
    // {
    //   index: 1,
    //   title: "GitHub",
    //   href: "https://github.com/yourusername",
    //   icon: <GitHubIcon />
    // },
    // {
    //   index: 2,
    //   title: "LinkedIn",
    //   href: "https://www.linkedin.com/in/yourprofile",
    //   icon: <LinkedInIcon />
    // },
  ];

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: `calc(100vh - 20px - 33px)` }}
    >
      <Grid item xs={3}>
        <Stack direction={{ xs: "column", sm: "row-reverse" }} spacing={2}>
          <Box>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography variant="h3">{process.env.REACT_APP_NAME}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Student at Harvard studying Statistics/CS and Applied Math
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Stack direction="row" spacing={0.4}>
                {links.map((link) => (
                  <Tooltip key={link.index} title={link.title} arrow>
                    <Link
                      target="_blank"
                      href={link.href}
                      underline="none"
                      color="inherit"
                    >
                      <IconButton color="inherit">{link.icon}</IconButton>
                    </Link>
                  </Tooltip>
                ))}
              </Stack>
            </Grid>

            {/* Updated GitHub Graph */}
            <Box
              mt={2}
              sx={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
            >
              <GitHubGraph username="john7rho" />
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
