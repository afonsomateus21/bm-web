import { ServiceCardProps } from "../../types";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../utils/formats";

export function ServiceCard({ title, description, price, imageUrl, user, service, onServiceClick }: ServiceCardProps) {
  const { t } = useTranslation();
  const safeImageUrl = imageUrl || "../../assets/no_image.png"; 
  const safePrice = price !== undefined && price !== null ? formatPrice(price) : t("Services.Card.PriceUnavailable");
  const isActive = service?.active;

  const handleClick = () => {
    if (user?.type === "ADMIN") {
      onServiceClick(service);
    }
  };

  return (
    <div 
      className={`w-full rounded-2xl border border-secondary overflow-hidden shadow-lg p-4 bg-white relative mb-8 ${
        user?.type === "ADMIN" ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
          <img
            src={safeImageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="font-bold text-tertiary text-xl truncate">{title}</div>
          <p className="text-tertiary text-sm font-medium line-clamp-1 overflow-hidden">{description}</p>
          <p className="text-tertiary font-extrabold text-lg mt-2">{safePrice}</p>
          <div className="flex gap-2 mt-2">
            <p className="bg-secondary rounded-lg text-white text-sm px-5 py-1 font-bold w-20">
              {t(`Category.${service.category}`)}
            </p>
            {user?.type === "ADMIN" && (
              <p
                className="rounded-lg bg-tertiary text-white text-sm px-5 py-1 font-bold w-20"
              >
                {isActive ? "Ativo" : "Inativo"}
              </p>
            )}
          </div>
        </div>
      </div>

      {user?.type === "CUSTOMER" && (
        <div className="absolute right-0 bottom-0">
          <button className="bg-tertiary rounded-xl text-white text-sm px-5 py-2 font-bold w-28">
            {t("Services.Card.Button")}
          </button>
        </div>
      )}
    </div>
  );
}
