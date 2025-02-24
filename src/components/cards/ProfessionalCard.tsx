import { ProfessionalCardProps } from "../../types";
import { useTranslation } from 'react-i18next';

export function ProfessionalCard({ name, category, imageUrl, professional, active, user, onProfessionalClick }: ProfessionalCardProps) {
  const { t } = useTranslation();
  const safeImageUrl = imageUrl || "../../assets/no_image.png";

  const handleClick = () => {
    onProfessionalClick(professional);
  };

  return (
    <div 
      className="w-full rounded-2xl border border-secondary overflow-hidden shadow-lg p-4 bg-white relative mb-8 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
          <img
            src={safeImageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="font-bold text-tertiary text-xl truncate">{name}</div>
          <p className="text-tertiary text-sm font-medium line-clamp-1 overflow-hidden">
            {t(`Category.${category}`)}
          </p>
          {user?.type === "ADMIN" && (
              <p
                className="rounded-lg bg-tertiary text-white text-sm mt-2 px-5 py-1 font-bold w-20"
              >
                {active ? "Ativo" : "Inativo"}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}