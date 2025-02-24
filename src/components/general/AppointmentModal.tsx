import EditSquareIcon from '@mui/icons-material/EditNote';
import TrashIcon from '@mui/icons-material/RestoreFromTrashSharp';
import CloseIcon from '@mui/icons-material/Close';
import { AppointmentModalProps } from "../../types";
import { IconButton } from "..";

export function AppointmentModal({ 
  isOpen, 
  onClose, 
  serviceTitle, 
  professionalName, 
  customerName,
  date,
  hour,
  onEdit,
  onDelete,
  userType,
}: AppointmentModalProps & { userType: 'CUSTOMER' | 'ADMIN' }) {
  if (!isOpen) return null;

  const formatDateTime = (dateString: string | undefined, timeString: string | undefined) => {
    const dateTime = new Date(`${dateString}T${timeString}:00`);
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(dateTime);
  };

  const formattedDateTime = formatDateTime(date, hour);

  const appointmentText = userType === 'CUSTOMER'
    ? `Você tem horário agendado para o serviço ${serviceTitle} com ${professionalName}.`
    : `Você tem horário marcado para ${serviceTitle} da(o) cliente ${customerName}.`;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div className="bg-tertiary rounded-2xl w-full max-w-md p-6 space-y-10">
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
            aria-label="Fechar modal"
          >
            <CloseIcon 
              fontSize="medium"
              className="text-white"
            />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-primary text-center">Informações</h1>

        <p className="text-white text-center">
          {appointmentText}
        </p>

        <div className="w-full rounded-4xl h-16 bg-primary flex items-center justify-center">
          <strong>{ formattedDateTime }</strong>
        </div>

        <div className="gap-5 space-y-4">
          <IconButton
            icon={
              <EditSquareIcon
                fontSize="large"
                className="text-secondary"
              />}
            title="Editar"
            format="outline"
            onClick={onEdit}
          />

          <IconButton
            icon={
              <TrashIcon
                fontSize="large"
                className="text-secondary"
              />}
            title="Desmarcar"
            format="outline"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};