import { User } from './user';

export interface ProfessionalFilterProps {
  professionals: User[];
  onSelect: (professionalId: string | null) => void;
  selectedId?: string | null;
}