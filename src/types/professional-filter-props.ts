import { Professional } from './professional';

export interface ProfessionalFilterProps {
  professionals: Professional[];
  onSelect: (professionalId: string | null) => void;
  selectedId?: string | null;
}