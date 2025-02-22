import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks";
import { CustomerHomeOption, HelpComponent, IconButton, ProfilePhoto, TextSeparator, Spinner } from "../components";
import SchedulingImage from "../assets/scheduling-image.png";
import ServicesImage from "../assets/services-image.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export function CustomerHome() {
  const { user, logout, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formattedName = user
    ? `${user.firstName ? user.firstName.split(" ")[0] : ""} ${user.lastName ? user.lastName.split(" ")[0] : ""}`.trim()
    : "";

  const photoUrl = user?.photo instanceof File
    ? URL.createObjectURL(user.photo)
    : user?.photo || '';

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-9 h-full flex flex-col">
      <header className="h-48 flex items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl font-medium">{ t('Common.WelcomeMessage') }</h1>
          <strong className="text-4xl font-extrabold">
            { formattedName }!
          </strong>
        </div>
        <ProfilePhoto 
          profileName={ t('Common.ProfileSubtitle') }
          photoUrl={ photoUrl } 
        />
      </header>

      <TextSeparator text={ t('Common.HomeQuestion') } />

      <main className="mt-5 flex-1 flex flex-col justify-evenly">
        <CustomerHomeOption 
          title={ t('Scheduling.Title') }
          description={ t('Scheduling.Description') }
          imageUrl={ SchedulingImage }
          redirectTo="/schedulings"
        />

        <CustomerHomeOption 
          title={ t('Services.Title') }
          description={ t('Services.Description') }
          imageUrl={ ServicesImage }
          redirectTo="/services"
        />

        <HelpComponent />

        <IconButton 
      title="Sair"
      onClick={handleLogout}
      icon={ 
        loading ? (
          <Spinner size="large" color="white" />
        ) : (
          <ExitToAppIcon htmlColor="white" fontSize="large" />
        )
      } 
      disabled={loading}
    />
      </main>
    </div>
  );
}