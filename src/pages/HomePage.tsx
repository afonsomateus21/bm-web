import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks";
import { HomeOption, HelpComponent, IconButton, ProfilePhoto, TextSeparator, Spinner } from "../components";
import SchedulingImage from "../assets/scheduling-image.png";
import ServicesImage from "../assets/services-image.png";
import ProfessionalsImage from "../assets/professionals-image.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { formatName, getPhotoUrl } from "../utils";

export function HomePage() {
  const { user, logout, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formattedName = formatName(user);
  const photoUrl = getPhotoUrl(user?.photo);

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

      <main className="my-10 flex flex-col gap-5 flex-1">
        <div className="max-h-[400px] flex-1 flex flex-col gap-5">
          <HomeOption 
            title={t('Scheduling.Title')}
            description={t('Scheduling.Description')}
            imageUrl={SchedulingImage}
            redirectTo="/services"
          />

          <HomeOption 
            title={t('Services.Title')}
            description={t(`Services.Description.${user?.type}`)}
            imageUrl={ServicesImage}
            redirectTo="/services"
          />
          
          {user?.type === 'ADMIN' && (
            <>
              <HomeOption 
                title={t('Professionals.Title')}
                description={t('Professionals.Description')}
                imageUrl={ProfessionalsImage}
                redirectTo="/professionals"
              />
            </>
          )}
        </div>

        {user?.type === 'CUSTOMER' && (
          <>
            <div className="flex justify-center py-5">
              <div className="w-[70%] border-b border-black" />
            </div>
          </>
        )}

        <div className="sticky bottom-0 bg-white flex flex-col gap-5">
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
        </div>
      </main>
    </div>
  );
}