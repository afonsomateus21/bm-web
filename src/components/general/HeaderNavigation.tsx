import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { HeaderNavigationProps } from "../../types"

export function HeaderNavigation({ backRoute, showHomeButton = false }: HeaderNavigationProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => navigate(backRoute)}
        className="underline text-md"
      >
        {t("Common.Buttons.Back")}
      </button>

      {showHomeButton && (
        <button
          onClick={() => navigate("/home")}
          className="text-tertiary hover:text-secondary transition-colors"
        >
          <HomeIcon fontSize="medium" />
        </button>
      )}
    </div>
  );
}