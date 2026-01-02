import {
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Props {
  path: string;
}

const markdownCache = new Map<string, string>();

function MarkdownLink({
  href,
  children,
  navigate,
}: {
  href?: string;
  children?: ReactNode;
  navigate: (path: string) => void;
}) {
  const isInternalLink = href?.startsWith("/notes/");

  if (isInternalLink && href) {
    return (
      <Link
        component="button"
        underline="hover"
        onClick={() => navigate(href)}
        sx={{ verticalAlign: "baseline" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} target="_blank" underline="hover">
      {children}
    </Link>
  );
}

function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props: { children: ReactNode }) {
  return (
    <TableCell>
      {props.children}
      {/* <Typography>{props.children}</Typography> */}
    </TableCell>
  );
}

function MarkdownCode(props: { children: ReactNode }) {
  return <Chip size="small" label={props.children?.toString()} />;
}

function MarkdownH1(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2em",
          display: "block",
          marginBlockStart: "0.67em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  );
}

function MarkdownH2(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.5em",
          display: "block",
          marginBlockStart: "0.83em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <Divider />
    </>
  );
}

// function MarkdownParagraph(props: { children: ReactNode }) {
//   if (!props.children) return <Typography>{props.children}</Typography>;

//   const element: any = props.children;
//   let result = [];

//   let anyInlineElement = false;
//   for (let e of element) {
//     if (e.type) {
//       anyInlineElement = true;
//     }
//   }

//   if (anyInlineElement) {
//     for (let e of element) {
//       if (e.type) {
//         result.push({ ...e });
//       } else {
//         result.push(
//           <Typography key={e} display="inline">
//             {e}
//           </Typography>
//         );
//       }
//     }
//   } else {
//     for (let e of element) {
//       if (e.type) {
//         result.push({ ...e });
//       } else {
//         result.push(<Typography key={e}>{e}</Typography>);
//       }
//     }
//   }

//   return <>{result}</>;
// }

export default function MDContainer({ path }: Props) {
  const [content, setContent] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const cached = markdownCache.get(path);

    if (cached) {
      setContent(cached);
      return;
    }

    const controller = new AbortController();
    fetch(path, { signal: controller.signal })
      .then((res) => res.text())
      .then((text) => {
        if (ignore) return;
        markdownCache.set(path, text);
        setContent(text);
      })
      .catch((error: any) => {
        if (error?.name !== "AbortError") {
          return;
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [path]);

  useEffect(() => {
    let title = pathname.substring(1, pathname.length);
    title = title[0].toUpperCase() + title.substring(1);
    document.title = `${process.env.REACT_APP_NAME!} | ${title}`;
  }, [pathname]);

  const markdownComponents = useMemo(
    () => ({
      code: MarkdownCode,
      a: (props: any) => <MarkdownLink {...props} navigate={navigate} />,
      table: MarkdownTable,
      thead: TableHead,
      tbody: TableBody,
      th: MarkdownTableCell,
      tr: TableRow,
      td: MarkdownTableCell,
      tfoot: TableFooter,
      h1: MarkdownH1,
      h2: MarkdownH2,
    }),
    [navigate]
  );

  return (
    <Container>
      <ReactMarkdown
        children={content}
        components={markdownComponents}
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      />
    </Container>
  );
}
