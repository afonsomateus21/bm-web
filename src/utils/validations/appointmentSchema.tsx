import { TFunction } from "i18next";
import { object, string, boolean, date } from "yup";

export const appointmentSchema = (t: TFunction) =>
  object({
    professional: string()
      .required(t("Common.Form.Errors.Professional.Required")),
    service: string()
      .required(t("Common.Form.Errors.Service.Required")),
    date: date()
      .required(t("Common.Form.Errors.Date.Required")),
    hour: string()
      .required(t("Common.Form.Errors.Hour.Required")),
    isNotifiable: boolean()
      .required()
  })