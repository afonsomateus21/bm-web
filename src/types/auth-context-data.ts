import { LoginInput } from "./login-input";
import { User } from "./user";
import { Professional} from "./professional";
import { PayloadProfessional } from "./payload-professional"

export interface AuthContextData {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null | undefined;
  professionals: Professional[];
  loading: boolean;
  createCustomer: (registerInput: User) => Promise<User | undefined>;
  login: (loginInput: LoginInput) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  fetchProfessionals: () => Promise<void>;
  toggleProfessionalActive: (professionalId: string, active: boolean) => Promise<void>;
  deleteProfessional: (professionalId: string) => Promise<void>;
  createProfessional: (professionalInput: PayloadProfessional) => Promise<PayloadProfessional | undefined>;
  updateProfessional: (professionalId: string, professionalInput: Partial<Omit<Professional, 'id'>>) => Promise<Professional | undefined>;
  getProfessionalById: (professionalId: string) => Promise<Professional | undefined>;
}