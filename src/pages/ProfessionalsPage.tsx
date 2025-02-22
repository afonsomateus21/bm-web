import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import { IconButton, Spinner, ProfessionalCard } from '../components';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../hooks/useAuth';
import { formatName } from "../utils";

export function ProfessionalsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, professionals, user } = useAuth();
  
  const hasProfessional = professionals?.length;

  console.log('profissionais: ', professionals);

  const handleNavigateToRegister = () => {
    navigate('/create');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner color="#EF007F" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <div className="p-6 flex-none">
        <button 
          onClick={() => navigate('/home')}
          className="underline text-md self-start mt-2 ml-1"
        >
          {t('Common.Buttons.Back')}
        </button>

        <h1 className="text-center text-3xl font-bold my-6">
          {t('Professionals.Title')}
        </h1>

        {user?.type === 'ADMIN' && (
          <>
            <IconButton 
              title={t('Common.Buttons.Add')}
              icon={ 
                <AddCircleIcon
                  htmlColor={'white'} 
                  fontSize={'large'}
                /> 
              }
              onClick={handleNavigateToRegister}
            />

            <div className="flex justify-center py-5">
              <div className="w-[30%] border-b border-black" />
            </div>
            
            <p className="block mb-5 text-center text-sm">{t('Professionals.HelpText')}</p>
          </>
        )}
      </div>

      <div className="flex-1 overflow-hidden px-6">
        <div className="h-full overflow-y-auto">
          {hasProfessional ? (
            professionals.map((professional) => (
              <ProfessionalCard
                key={professional?.id}
                name={formatName(professional)}
                category={professional?.category}
                imageUrl={String(professional?.photo)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              {t('Professionals.NoServicesFound')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}