import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { keyframes } from "@mui/system";

// Keyframes for pulsing animation
const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
`;

export default function SettingsPage() {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    let title = pathname.substring(1, pathname.length);
    title = title[0].toUpperCase() + title.substring(1);
    document.title = `${process.env.REACT_APP_NAME!} | ${title}`;
  }, [pathname]);

  useEffect(() => {
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Me 🇰🇷 🇺🇸
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
        <Box flexShrink={0}>
          <img
            src="/rho_boston.jpg"
            alt="Your Photo Here"
            style={{ borderRadius: 8, width: 350, height: "auto" }}
          />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center" }}
          >
            May 2025 // Boston, MA
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, textAlign: "center", fontSize: "0.75rem" }}
          >
            Photo credit: Raj Sastry
          </Typography>
        </Box>
        <Box sx={{ position: "relative", display: "flex" }}>
          <Box
            ref={setScrollContainer}
            sx={{
              height: "fit-content",
              maxHeight: "500px",
              overflowY: "auto",
              paddingRight: 1,
              flex: 1,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Bridges Across Boundaries
            </Typography>
            <Typography paragraph>
              At twenty-two, I carry within me the wide-open spirit of
              Texas—that place where horizons stretch endlessly and possibility
              feels as vast as the summer sky. Born and raised in a state where
              cultures blend seamlessly from border to metropolis, I learned
              early that the most fascinating discoveries happen at the
              intersections where different worlds meet.
            </Typography>
            <Typography paragraph>
              My approach to life mirrors what we call the
              exploration-exploitation paradigm in reinforcement learning—that
              delicate dance between venturing into uncharted territory and
              deepening our understanding of what we’ve already discovered. Like
              an algorithm learning to navigate a complex environment, I’ve
              found that the most rewarding path forward requires balancing bold
              curiosity with the wisdom gained from experience. Sometimes you
              must venture beyond the familiar to find unexpected rewards; other
              times, you deepen your mastery of known terrain. This philosophy
              has shaped every major decision I’ve made.
            </Typography>
            <Typography paragraph>
              During college, this mindset led me to seek experiences across
              vastly different domains. At StubHub, a company poised on the
              exciting precipice of an IPO, I immersed myself in product
              development—learning how consumer needs translate into features
              that millions of people use to create memories at concerts and
              games. The energy was palpable; every day brought new challenges
              as we scaled systems and refined experiences for an ever-growing
              audience.
            </Typography>
            <Typography paragraph>
              From there, I pivoted to investment banking at Lazard, where I
              focused on growth-stage fundraising. The transition felt like
              learning a new language—from product metrics to financial
              modeling, from user journeys to capital structures. Each deal told
              a story of entrepreneurs building something meaningful, and I
              found myself fascinated by how different perspectives in the room
              could shape the narrative and unlock value. Meanwhile, my
              engineering work with various startups kept me grounded in the
              technical realities of building—reminding me that behind every
              financial model is code, and behind every code base are real
              people solving real problems.
            </Typography>
            <Typography paragraph>
              Today, I’ve planted myself across three dynamic cities—San
              Francisco, Boston, and New York—building a technical consultancy
              that embodies this philosophy of exploration. Each city offers its
              own unique ecosystem: San Francisco’s relentless innovation,
              Boston’s academic depth, and New York’s financial sophistication.
              Moving between these worlds, I’ve discovered that the most
              impactful solutions emerge when we bridge different domains of
              knowledge and connect diverse communities of builders.
            </Typography>
            <Typography paragraph>
              We’re living through what feels like a fundamental transformation
              in human capability—artificial intelligence isn’t just another
              technological advancement, it’s a paradigm shift that’s reshaping
              how we think, create, and collaborate. Like the printing press or
              the internet before it, AI represents a new chapter in our
              collective story, one where the boundaries between human insight
              and machine capability blur in extraordinary ways. Every
              conversation I have, every project I take on, is touched by this
              reality that we’re not just building software anymore—we’re
              crafting tools that augment human potential itself.
            </Typography>
            <Typography paragraph>
              What excites me most is how this moment demands exactly the kind
              of cross-pollination I’ve always gravitated toward. The most
              meaningful AI applications don’t emerge from technical prowess
              alone, but from understanding human needs, market dynamics, and
              the intricate ways that different communities approach problems.
              My journey from Texas to these coastal cities, from product to
              finance to engineering, feels like preparation for this moment
              when diverse perspectives aren’t just valuable—they’re essential.
            </Typography>
            <Typography paragraph>
              Each day brings new opportunities to explore uncharted territory
              while building on the foundations we’ve already established.
              Whether I’m working with a startup founder in Boston,
              collaborating with researchers in San Francisco, or meeting with
              investors in New York, I’m reminded that our differences aren’t
              barriers to overcome—they’re bridges to cross, leading us toward
              solutions we could never have imagined alone.
            </Typography>
            <Typography paragraph>
              This is the adventure I find myself on: using the
              exploration-exploitation framework not just as a technical
              concept, but as a philosophy for building connections, creating
              value, and navigating a world where artificial intelligence is
              opening possibilities we're only beginning to understand. The
              horizon ahead feels as vast and full of promise as those Texas
              skies that first taught me to dream big.
            </Typography>
          </Box>

          {/* Custom minimalist scrollbar */}
          <Box
            sx={{
              position: "absolute",
              right: "8px",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "1px",
            }}
          >
            {/* Progress line */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: `${scrollProgress * 100}%`,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "1px",
                transition: "height 0.1s ease-out",
              }}
            />

            {/* Pulsing dot indicator */}
            <Box
              sx={{
                position: "absolute",
                left: "-3px",
                top: `${scrollProgress * 100}%`,
                width: "8px",
                height: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
                transform: "translateY(-50%)",
                animation: `${pulse} 2s ease-in-out infinite`,
                transition: "top 0.1s ease-out",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
