import { LoginInput } from "./login-input";
import { User } from "./user";

export interface AuthContextData {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null | undefined;
  professionals: User[];
  loading: boolean;
  createCustomer: (registerInput: User) => Promise<User | undefined>;
  login: (loginInput: LoginInput) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  fetchProfessionals: () => Promise<void>;
}