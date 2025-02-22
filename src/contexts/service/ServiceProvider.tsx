import { useEffect, useState, useCallback } from "react";
import { api } from "../../services";
import { CustomProviderProps, Service, ApiServiceResponse } from "../../types";
import { ServiceContext } from "./ServiceContext";
import { useAuth } from "../../hooks/useAuth";
import { handleUploadImageToStorage } from "../../utils";

export const ServiceProvider = ({ children }: CustomProviderProps) => {
  const { accessToken, user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);

  const applyFilters = useCallback(() => {
    let filtered = services;

    if (searchTerm.trim()) {
      filtered = filtered.filter(service => 
        service?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProfessionalId && user?.type === 'CUSTOMER') {
      filtered = filtered.filter(service => 
        service.professionalId === selectedProfessionalId
      );
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedProfessionalId, user?.type]);

  const fetchServices = useCallback(async () => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/service', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const servicesData: Service[] = response?.data?.map((service: ApiServiceResponse) => ({
        ...service,
        professionalId: service?.professional_id,
      }));

      setServices(servicesData);
      setFilteredServices(servicesData);
    } catch (error) {
      setError('Erro ao carregar serviços');
      console.error('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedProfessionalId, applyFilters]);

  useEffect(() => {
    if (accessToken) {
      fetchServices();
    }
  }, [accessToken, fetchServices]);

  const filterServices = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleProfessionalSelect = useCallback((professionalId: string | null) => {
    setSelectedProfessionalId(professionalId);
  }, []);

  const createService = useCallback(async (serviceInput: Service) => {
    if (!accessToken) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      let servicePhotoUrl: string | null = null;
    
      if (serviceInput.photo) {
        try {
          servicePhotoUrl = await handleUploadImageToStorage("services", serviceInput?.photo);
        } catch (uploadError) {
          console.error("Erro ao fazer upload da imagem:", uploadError);
          throw new Error("Erro ao enviar a foto do serviço. Tente novamente.");
        }
      }

      const service = {
        title: serviceInput.title,
        description: serviceInput.description,
        category: serviceInput.category,
        professional_id: serviceInput.professionalId,
        duration: serviceInput.duration,
        price: serviceInput.price,
        photo: servicePhotoUrl,
      };

      const response = await api.post("/service", service, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await fetchServices();
      return response.data;
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      throw new Error("Erro ao criar serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchServices]);

  const toggleServiceActive = useCallback(async (serviceId: string, newActiveStatus: boolean) => {
    if (!accessToken) {
      throw new Error("Usuário não autenticado.");
    }
  
    try {
      setLoading(true);
      const response = await api.put(`/service/${serviceId}`, { active: newActiveStatus }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      await fetchServices();
      return response.data;
    } catch (error) {
      console.error("Erro ao alternar status do serviço:", error);
      throw new Error("Erro ao alternar status do serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchServices]);
  
  const deleteService = useCallback(async (serviceId: string) => {
    if (!accessToken) {
      throw new Error("Usuário não autenticado.");
    }
  
    try {
      setLoading(true);
      await api.delete(`/service/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      await fetchServices();
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
      throw new Error("Erro ao excluir serviço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchServices]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        filteredServices,
        loading,
        error,
        searchTerm,
        selectedProfessionalId,
        fetchServices,
        filterServices,
        setSelectedProfessionalId: handleProfessionalSelect,
        createService,
        toggleServiceActive,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};