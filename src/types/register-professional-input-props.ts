export interface RegisterProfessionalFormInputProps {
  firstName: string;
  lastName: string;
  category: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  profilePhoto?: File;
}