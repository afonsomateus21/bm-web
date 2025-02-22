import { useEffect, useState, useCallback } from "react";
import { api } from "../../services";
import { CustomProviderProps, Service, ApiServiceResponse } from "../../types";
import { ServiceContext } from "./ServiceContext";
import { useAuth } from "../../hooks/useAuth";

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
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};