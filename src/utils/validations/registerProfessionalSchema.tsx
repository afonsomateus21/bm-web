import { TFunction } from "i18next";
import { object, string, array, ref } from "yup";

export const registerProfessionalSchema = (t: TFunction) => object().shape({
  firstName: string().required(t('Common.Form.Errors.FirstNameRequired')),
  lastName: string().required(t('Common.Form.Errors.LastNameRequired')),
  category: string().required(t('Common.Form.Errors.CategoryRequired')),
  email: string().email(t('Common.Form.Errors.EmailInvalid')).required(t('Common.Form.Errors.EmailRequired')),
  phone: string().required(t('Common.Form.Errors.PhoneRequired')),
  password: string()
    .min(8, t('Common.Form.Errors.PasswordMin'))
    .required(t('Common.Form.Errors.PasswordRequired')),
  confirmPassword: string()
    .oneOf([ref('password')], t('Common.Form.Errors.PasswordMatch'))
    .required(t('Common.Form.Errors.ConfirmPasswordRequired')),
  timeSlots: array().of(
    object().shape({
      dayOfWeek: string().required(t('Common.Form.Errors.DayRequired')),
      startTime: string().required(t('Common.Form.Errors.StartTimeRequired')),
      endTime: string().required(t('Common.Form.Errors.EndTimeRequired'))
    })
  ).default([])
});