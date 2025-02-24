export interface PayloadProfessional {
  firstName: string
  lastName: string
  category: string
  email: string
  phone: string
  profilePhoto?: File
  password?: string
  confirmPassword?: string
}