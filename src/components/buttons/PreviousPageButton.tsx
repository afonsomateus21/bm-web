import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function PreviousPageButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return(
    <button 
      onClick={() => navigate(-1)}
      className="underline text-md"
    >
      { t('Common.Buttons.Back') }
    </button>
  );
}