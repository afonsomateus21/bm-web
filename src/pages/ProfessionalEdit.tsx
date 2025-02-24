import { useParams } from "react-router";
import { FormProfessional } from "../components";

export function ProfessionalEdit() {
  const { id } = useParams<{ id: string }>();
  return <FormProfessional isEdit professionalId={id}/>;
}