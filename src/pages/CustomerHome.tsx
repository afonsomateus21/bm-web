import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks";
import { CustomerHomeOption, HelpComponent, IconButton, ProfilePhoto, TextSeparator } from "../components";
import SchedulingImage from "../assets/scheduling-image.png";
import ServicesImage from "../assets/services-image.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export function CustomerHome() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const formattedName = user
    ? `${user.firstName ? user.firstName.split(" ")[0] : ""} ${user.lastName ? user.lastName.split(" ")[0] : ""}`.trim()
    : "";
  const photoUrl = user?.photo
    ? (user.photo instanceof Blob ? URL.createObjectURL(user.photo) : user.photo)
    : undefined;

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
          redirectTo="/services"
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
          icon={ 
            <ExitToAppIcon 
              htmlColor={'white'} 
              fontSize={ 'large' }
            /> 
          } 
        />
      </main>
    </div>
  );
}