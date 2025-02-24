import EditSquareIcon from '@mui/icons-material/EditNote';
import TrashIcon from '@mui/icons-material/RestoreFromTrashSharp';
import CloseIcon from '@mui/icons-material/Close';
import { AppointmentModalProps, } from "../../types";
import { IconButton, TextSeparator } from "..";
import { useTranslation } from "react-i18next";

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
}: AppointmentModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div className="bg-tertiary rounded-2xl w-full max-w-md p-6 space-y-10">
        <h1 className="text-2xl font-bold text-primary text-center">Tem certeza?</h1>

        <p className="text-white">
          Você escolheu { serviceTitle } com { professionalName }
        </p>

        <div className="w-full rounded-4xl h-16 bg-primary flex items-center justify-center">
          <strong>{ date } às { hour }</strong>
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
            title="Excluir"
            format="outline"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};