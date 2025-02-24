import { useTranslation } from "react-i18next";
import { CustomSelect, DateInput, FlatButton, Footer } from "../components";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, Controller } from "react-hook-form";
import { AppointmentFormInput } from "../types";
import { appointmentSchema } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppointment } from "../hooks";
import { useEffect, useState } from "react";

export function CreateOrEditAppointment() {
  const { t } = useTranslation();
  const { 
    control,
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<AppointmentFormInput>({ resolver: yupResolver(appointmentSchema(t)) });
  const { professionals, createAppointment, getServicesByProfessional } = useAppointment();
  const selectedProfessional = watch("professional");
  const [services, setServices] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      if (selectedProfessional) {
        const response = await getServicesByProfessional(selectedProfessional);

        if (response.length === 0) {
          console.log('entrou');
          setServices([{ label: "Não encontrado", value: "" }]);
        } else {
          setServices(response);
        }
      }
    }

    fetchServices();

  }, [selectedProfessional])

  async function onSubmit(data: AppointmentFormInput) {
    console.log(data);

    await createAppointment(data);
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-6">
        { t('Scheduling.Create') }
      </h1>

      <form 
        onSubmit={ handleSubmit(onSubmit) }
        className="flex flex-col gap-6"
      >
        <Controller 
          name="professional"
          control={ control }
          defaultValue=""
          render={({ field }) => (
            <CustomSelect 
              title="Profissional"
              options={ professionals }
              value={ field.value }
              onChange={ field.onChange }
              errors={ errors?.professional?.message }
            />
          )}  
        />

        <Controller 
          name="service"
          control={ control }
          defaultValue=""
          render={({ field }) => (
            <CustomSelect 
              title="Serviço"
              options={ services }
              value={ field.value }
              onChange={ field.onChange }
              errors={ errors?.service?.message }
            />
          )}  
        />

        <Controller 
          name="date"
          control={ control }
          render={({ field }) => (
            <DateInput 
              title="Data"
              type="date"
              icon={
                <DateRangeIcon 
                  htmlColor="black"
                  fontSize="large"
                />
              }
              dateValue={ field.value }
              onChangeDate={ field.onChange }
              errors={ errors?.date?.message }
            />
          )}  
        />

        <Controller 
          name="hour"
          control={ control }
          defaultValue=""
          render={({ field }) => (
            <CustomSelect 
              title="Hora"
              icon={  
                <AccessTimeIcon 
                  htmlColor="black"
                  fontSize="large"
                />
              }
              options={[
                {
                  value: "08:00",
                  label: "08:00"
                },
                {
                  value: "09:00",
                  label: "09:30"
                },
              ]}
              value={ field.value }
              onChange={ field.onChange }
              errors={ errors?.hour?.message }
            />
          )}  
        />

        <label 
          htmlFor="send-notification"
          className="flex items-center text-secondary"
        >
          <input 
            type="checkbox" 
            id="send-notification" 
            { ...register("isNotifiable") }
            className="size-7 accent-secondary"
          />
          <span className="ml-2 text-lg">
            { t('Common.Form.Fields.Notification') }
          </span>
        </label>

        <FlatButton 
          type="submit"
          title="Agendar"
        />
      </form>
      <Footer 
        title={ t('Scheduling.CancelPolicyText') }
        icon={
          <InfoIcon 
            htmlColor="white"
            fontSize="medium"
          />
        }
      />
    </div>
  );
}