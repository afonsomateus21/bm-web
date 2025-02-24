import { useEffect, useState } from "react";
import { IconButton, SearchDateInput, ServiceScheduled, Spinner } from "../components";
import { useAppointment } from "../hooks";
import { Appointment, SearchByDateInput } from "../types";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";


export function SchedulingList() {
  const { t } = useTranslation();
  const { 
    loading, 
    listAppointmentsByCustomer,
    listAppointmentsByCustomerAndDate
  } = useAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();
  const { 
    control,
  } = useForm<SearchByDateInput>();

  useEffect(() => {
    const fetchAppointmentsByCustomer = async () => {
      const response = await listAppointmentsByCustomer();

      setAppointments(response);
    }

    fetchAppointmentsByCustomer();
  }, []);

  async function handleChangeDate(value) {
    const date = value
    console.log(date);
    try {
      const response = await listAppointmentsByCustomerAndDate(date.toISOString().split('T')[0]);
      console.log(response);
      if (!response || response.length === 0) {
        setAppointments([]);
        return;
      }
      setAppointments(response);
    } catch(e) {
      setAppointments([])
    }
  }


  return (
    loading 
      ? 
      <div className="h-full flex flex-col justify-center">
        <Spinner color="#EF007F" />
      </div>
      :
      <div className="h-full flex flex-col justify-evenly">
        <div className="flex-1 flex flex-col justify-evenly">
          <h1 className="text-4xl font-bold text-center">
            { t('Scheduling.Title') }
          </h1>
          <div className="h-[150px] flex flex-col justify-between">
            <form>
              <Controller 
                name="date"
                control={ control }
                render={({ field }) => (
                  <SearchDateInput 
                    type="date"
                    icon={
                      <DateRangeIcon 
                        htmlColor="black"
                        fontSize="large"
                      />
                    }
                    dateValue={ field.value }
                    onChangeDate={ field.onChange }
                    onChange={ handleChangeDate }
                  />
                )}  
              />
            </form>
            <hr className="h-[0.3px] bg-black w-1/4 mx-auto" />
            <IconButton 
              icon={
                <AddCircleOutlineIcon 
                  htmlColor="white"
                  fontSize="large"
                />
              }
              title={t('Scheduling.Button.NewScheduling')}
              onClick={ () => navigate("/appointments/create") }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 h-[500px] overflow-y-scroll">
          {
            appointments.length > 0 
            ? appointments.map(appointment => (
              <ServiceScheduled 
                onClick={ () => navigate(`edit/${appointment.id}`) }
                key={appointment.id}
                photo={appointment.service.photo}
                serviceTitle={appointment.service.title}
                date={
                  format(parseISO(appointment.date), "dd/MM")
                }
                professional={`${appointment.professional.first_name} ${appointment.professional.last_name}`}
                hour={`${appointment.hour}:00`}
              />
            ))
            : 
            <div className="h-full flex items-center justify-center">
              <span>{ t('Scheduling.NotFound') }</span>
            </div>
          }
        </div>
      </div>
  );
}