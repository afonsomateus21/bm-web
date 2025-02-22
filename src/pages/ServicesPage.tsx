import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import { SearchBar, ProfessionalFilter, IconButton, TextSeparator, Spinner, ServiceCard } from '../components';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../hooks/useAuth';
import { useService } from '../hooks/useService';
import { getPhotoUrl } from "../utils";

export function ServicesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { professionals, user } = useAuth();
  const { 
    loading, 
    filteredServices, 
    filterServices,
    selectedProfessionalId,
    setSelectedProfessionalId,
  } = useService();
  
  const hasServices = filteredServices?.length;

  useEffect(() => {
    if (user?.type === "CUSTOMER" && professionals?.length && !selectedProfessionalId) {
      const firstProfessionalId = professionals[0]?.id ?? null;
      setSelectedProfessionalId(firstProfessionalId);
    }
  }, [user, professionals, selectedProfessionalId, setSelectedProfessionalId]);

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
          {t('Services.Title')}
        </h1>

        <SearchBar
          placeholder={t('Services.SearchBar.Placeholder')}
          onSearch={filterServices}
        />

        {user?.type === 'CUSTOMER' && (
          <>
            <TextSeparator
              text={t('Services.ProfessionalFilter.Label')}
              textSize="sm"
              color="terciary"
              fontWeight="medium"
            />

            <ProfessionalFilter
              professionals={professionals}
              selectedId={selectedProfessionalId}
              onSelect={setSelectedProfessionalId}
            />
          </>
        )}

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
            
            <p className="block mb-5 text-center text-sm">{t('Services.HelpText')}</p>
          </>
        )}
      </div>

      <div className="flex-1 overflow-hidden px-6">
        <div className="h-full overflow-y-auto">
          {hasServices ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service?.id}
                title={service?.title}
                description={service?.description}
                price={service?.price}
                imageUrl={getPhotoUrl(service.photo)}
                user={user || null}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              {t('Services.NoServicesFound')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}