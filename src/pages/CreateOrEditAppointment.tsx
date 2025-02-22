import { useTranslation } from "react-i18next";
import { CustomSelect, DateInput, FlatButton, Footer } from "../components";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';

export function CreateOrEditAppointment() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center mt-6">
        { t('Scheduling.Create') }
      </h1>

      <div className="flex flex-col gap-6">
        <CustomSelect 
          title="Profissional"
          options={[
            {
              value: "sasasadasds",
              label: "Samara"
            },
            {
              value: "dasdadsadas",
              label: "Letícia"
            },
          ]}
        />

        <CustomSelect 
          title="Serviço"
          options={[
            {
              value: "sasasadasds",
              label: "Lash"
            },
            {
              value: "dasdadsadas",
              label: "Unhas"
            },
          ]}
        />

        <DateInput 
          title="Data"
          type="date"
          icon={
            <DateRangeIcon 
              htmlColor="black"
              fontSize="large"
            />
          }
        />

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
        />

        <label 
          htmlFor="send-notification"
          className="flex items-center text-secondary"
        >
          <input 
            type="checkbox" 
            name="send-notification" 
            id="send-notification" 
            className="size-7 accent-secondary"
          />
          <span className="ml-2 text-lg">
            { t('Common.Form.Fields.Notification') }
          </span>
        </label>

        <FlatButton 
          title="Agendar"
        />
      </div>
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