import { useParams } from "react-router";
import { FormService } from "../components";

export function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  return <FormService action="edit" serviceId={id} />;
}