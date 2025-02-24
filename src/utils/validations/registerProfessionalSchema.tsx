import { TFunction } from "i18next";
import { object, string } from "yup";

export const registerProfessionalSchema = (t: TFunction) => {
  return object().shape({
    firstName: string().required(t('Professionals.Form.Errors.FirstName.Required')),
    lastName: string().required(t('Professionals.Form.Errors.LastName.Required')),
    category: string().required(t('Professionals.Form.Errors.Category.Required')),
    email: string()
      .email(t('Professionals.Form.Errors.EmailInvalid'))
      .required(t('Professionals.Form.Errors.Email.Required')),
    phone: string().required(t('Professionals.Form.Errors.Phone.Required')),
  });
};
