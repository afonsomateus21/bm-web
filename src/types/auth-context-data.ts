import { LoginInput } from "./login-input";
import { User } from "./user";
import { Professional } from "./professional";

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
}