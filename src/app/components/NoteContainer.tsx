import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const NoteMDContainer = lazy(() => import("./NoteMDContainer"));

function LoadingFallback() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress size={24} />
    </Box>
  );
}

export default function NoteContainer() {
  const { noteId } = useParams<{ noteId: string }>();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <NoteMDContainer path={`/pages/notes/${noteId}.md`} />
    </Suspense>
  );
}
