export interface ManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  imageUrl: string;
  isActive: boolean;
  onToggleActive: () => void;
  onEdit: () => void;
  onDelete: () => void;
}