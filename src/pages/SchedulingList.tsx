import { useEffect, useState } from "react";
import { IconButton, SearchDateInput, ServiceScheduled, Spinner } from "../components";
import { useAppointment, useAuth } from "../hooks";
import { Appointment, SearchByDateInput } from "../types";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { AppointmentModal } from "../components/general/AppointmentModal";


export function SchedulingList() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { 
    loading, 
    listAppointmentsByCustomer,
    listAppointmentsByProfessional,
    listAppointmentsByCustomerAndDate,
    removeAppointment
  } = useAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();
  const { 
    control,
  } = useForm<SearchByDateInput>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      let response;
      if (user?.type === "ADMIN") {
        response = await listAppointmentsByProfessional();
      } else {
        response = await listAppointmentsByCustomer();
      }
      setAppointments(response || []);
    }

    fetchAppointments();
  }, [user]);

  async function handleChangeDate(value) {
    try {
      if (!value) {
        setAppointments([]);
        return;
      }
      
      const dateString = value.toISOString().split('T')[0];
      const response = await listAppointmentsByCustomerAndDate(dateString);
      
      setAppointments(response || []);
    } catch(e) {
      console.error("Error fetching appointments:", e);
      setAppointments([]);
    }
  }

  const fetchAppointments = async () => {
    let response;
    try {
      if (user?.type === "ADMIN") {
        response = await listAppointmentsByProfessional();
      } else {
        response = await listAppointmentsByCustomer();
      }
      setAppointments(response || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      try {
        await removeAppointment(selectedAppointment.id);
        
        fetchAppointments();
        
        setIsModalOpen(false);
        setSelectedAppointment(null);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

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
            appointments?.length > 0 
            ? appointments.map(appointment => (
              <ServiceScheduled 
                onClick={ () => {
                  setSelectedAppointment(appointment);
                  setIsModalOpen(true);
                }}
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
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAppointment(null);
          }}
          serviceTitle={selectedAppointment?.service?.title || ''}
          professionalName={ `${selectedAppointment?.professional?.first_name} ${selectedAppointment?.professional?.last_name}` }
          customerName={ `${selectedAppointment?.customer?.first_name} ${selectedAppointment?.customer?.last_name}` }
          date={ selectedAppointment?.date }
          hour={ `${selectedAppointment?.hour}:00` }
          onEdit={() => {
            navigate(`edit/${selectedAppointment?.id}`);
          }}
          onDelete={ handleDelete }
          userType={user?.type}
        />
      </div>
  );
}