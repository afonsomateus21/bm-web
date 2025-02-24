import { TFunction } from "i18next";
import { object, string, boolean, date } from "yup";

export const appointmentSchema = (t: TFunction, isReservation: boolean) =>
  object({
    professional: string()
      .required(t("Common.Form.Errors.Professional.Required")),
    customer: string().when([], {
      is: () => isReservation,
      then: schema => schema.required(t("Common.Form.Errors.Customer.Required")),
      otherwise: schema => schema.optional()
    }),
    service: string()
      .required(t("Common.Form.Errors.Service.Required")),
    date: date()
      .required(t("Common.Form.Errors.Date.Required")),
    hour: string()
      .required(t("Common.Form.Errors.Hour.Required")),
    isNotifiable: boolean()
      .required()
  }) 