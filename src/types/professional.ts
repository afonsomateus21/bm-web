export interface Professional {
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  profilePhoto?: File;
  category: string;
  active?: boolean;
  email?: string;
  phone: string;
}