import { TFunction } from "i18next";
import { object, string, number } from "yup";


export const registerServiceSchema = (t: TFunction) =>
  object({
    title: string()
      .required(t('Services.Form.Errors.Title.Required')),
    description: string()
      .required(t('Services.Form.Errors.Description.Required')),
    category: string()
      .required(t('Services.Form.Errors.Category.Required')),
    professionalId: string()
      .required(t('Services.Form.Errors.Professional.Required')),
    price: number()
      .required(t('Services.Form.Errors.Price.Required')),
    duration: number()
      .required(t('Services.Form.Errors.Duration.Required'))
  })