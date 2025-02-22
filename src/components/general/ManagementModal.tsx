import EditSquareIcon from '@mui/icons-material/EditNote';
import TrashIcon from '@mui/icons-material/RestoreFromTrashSharp';
import CloseIcon from '@mui/icons-material/Close';
import { ManagementModalProps } from "../../types";
import { IconButton, TextSeparator, ToggleSwitch } from "..";
import { useTranslation } from "react-i18next";

export function ManagementModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  imageUrl,
  isActive,
  onToggleActive 
}: ModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div className="bg-tertiary rounded-2xl w-full max-w-md p-6 space-y-10">
        <div className="flex items-start">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-38 h-40 rounded-2xl object-cover"
          />

          <div className="flex-1 pl-6">
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

            <div className="mt-2">
              <h2 
                id="modal-title" 
                className="text-2xl font-bold text-white truncate whitespace-nowrap"
              >
                {title}
              </h2>

              <p 
                className="text-lg text-white line-clamp-2"
              >
                {subtitle}
              </p>

              <div className="flex items-center space-x-2 mt-2">
                <ToggleSwitch
                  isActive={isActive}
                  onToggle={onToggleActive}
                />
                <span className="text-white text-sm">
                  { t('Common.ToggleActivation') }
                </span>
              </div>
            </div>
          </div>
        </div>

        <TextSeparator
          text={ t('Common.HomeQuestion') }
          textSize="lg"
          color="primary"
          lineColor='secondary'
          fontWeight="medium"
          background='tertiary'
        />

        <div className="gap-5 space-y-4">
          <IconButton
            icon={
              <EditSquareIcon
                fontSize="large"
                className="text-secondary"
              />}
            title="Editar"
            format="outline"
            onClick={() => console.log("Editar clicado")}
          />

          <IconButton
            icon={
              <TrashIcon
                fontSize="large"
                className="text-secondary"
              />}
            title="Excluir"
            format="outline"
            onClick={() => console.log("Excluir clicado")}
          />
        </div>
      </div>
    </div>
  );
};