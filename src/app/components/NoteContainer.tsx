import { useParams } from "react-router-dom";
import MDContainer from "./MDContainer";

export default function NoteContainer() {
  const { noteId } = useParams<{ noteId: string }>();

  return <MDContainer path={`/pages/notes/${noteId}.md`} />;
}
