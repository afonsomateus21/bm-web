import { Service } from './service'

export interface ServiceContextData {
  services: Service[];
  filteredServices: Service[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedProfessionalId: string | null;
  fetchServices: () => Promise<void>;
  filterServices: (term: string) => void;
  setSelectedProfessionalId: (id: string | null) => void;
}