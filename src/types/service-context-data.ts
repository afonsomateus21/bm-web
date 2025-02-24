import { Service } from './service'

export interface ServiceContextType {
  services: Service[];
  filteredServices: Service[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedProfessionalId: string | null;
  fetchServices: () => Promise<void>;
  filterServices: (term: string) => void;
  setSelectedProfessionalId: (professionalId: string | null) => void;
  createService: (serviceInput: Service) => Promise<void>;
  toggleServiceActive: (serviceId: string) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
}