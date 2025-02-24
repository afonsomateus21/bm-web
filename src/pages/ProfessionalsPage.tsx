import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import { IconButton, Spinner, ProfessionalCard, ManagementModal, HeaderNavigation } from '../components';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../hooks/useAuth';
import { formatName, getPhotoUrl } from "../utils";
import { Professional } from "../types";

export function ProfessionalsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, professionals, user, toggleProfessionalActive, deleteProfessional } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const hasProfessional = professionals?.length;

  const handleNavigateToRegister = () => {
    navigate('/create');
  };

  const handleProfessionalClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };

  const handleToggleActive = async () => {
    if (selectedProfessional) {
      const newActiveStatus = !selectedProfessional.active;
      await toggleProfessionalActive(selectedProfessional.id, newActiveStatus);
      setSelectedProfessional((prev) => {
        if (prev) {
          return {
            ...prev,
            active: newActiveStatus,
          };
        }
        return prev;
      });
    }
  };

  const handleDelete = async () => {
    if (selectedProfessional) {
      await deleteProfessional(selectedProfessional.id);
      setIsModalOpen(false);
    }
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
        <HeaderNavigation backRoute="/home" showHomeButton={true} />

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
                professional={professional}
                active={professional?.active}
                user={user}
                onProfessionalClick={() => handleProfessionalClick(professional)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              {t('Professionals.NoServicesFound')}
            </p>
          )}
        </div>
      </div>

      <ManagementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProfessional(null);
        }}
        title={selectedProfessional ? formatName(selectedProfessional) : ''}
        subtitle={t(`Category.${selectedProfessional?.category}`)}
        imageUrl={getPhotoUrl(selectedProfessional?.photo)}
        isActive={selectedProfessional?.active || false}
        onToggleActive={handleToggleActive}
        onEdit={() => {
          navigate(`professionals/edit/${selectedProfessional?.id}`);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}