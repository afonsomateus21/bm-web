import { useEffect, useState } from "react";
import { api } from "../../services";
import { CustomProviderProps, LoginInput, User, ApiAdmin, Professional } from "../../types";
import { AuthContext } from "./AuthContext";
import { handleUploadImageToStorage, isTokenExpired } from "../../utils";

export const AuthProvider = ({ children }: CustomProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    () => localStorage.getItem("refresh_token")
  );
  const [user, setUser] = useState<User | null>();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && isTokenExpired(accessToken)) {
        await refreshAccessToken();
      }
      await getCurrentUser();
    };

    fetchUser();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchProfessionals();
    }
  }, [accessToken]);

  async function login(loginInput: LoginInput) {
    const response = await api.post("/auth/token", loginInput);

    setAccessToken(response.data["access_token"]);
    setRefreshToken(response.data["refresh_token"]);

    localStorage.setItem("access_token", response.data["access_token"]);
    localStorage.setItem("refresh_token", response.data["refresh_token"]);
  }

  async function logout() {
    setLoading(true);
  
    try {
      await api.post("/auth/logout", {}, { 
        headers: { Authorization: `Bearer ${accessToken}` }
      }).catch(() => {});
  
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setProfessionals([]);
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
  
      setLoading(false); 
    }
  }  

  async function refreshAccessToken() {
    try {
      const response = await api.post(
        "/auth/refresh", 
        {
          "refresh_token": refreshToken
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status !== 200) return logout();

      const data = response.data;

      setAccessToken(data["access_token"]);
      localStorage.setItem("access_token", data["access_token"]);
    } catch(error) {
      console.log(error);
      logout();
    }
  }

  async function getCurrentUser() {
    try {
      const response = await api.get(
        "/auth/user/me",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );

      const data = response.data;

      const currentUser: User = {
        "id": data["id"],
        "firstName": data["first_name"],
        "lastName": data["last_name"],
        "email": data["email"],
        "phone": data["phone"],
        "photo": data["photo"],
        "type": data["type"],
        "googleSub": data["google_sub"]
      };

      setUser(currentUser);
    } catch(error: unknown) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createCustomer(userInput: User) {
    try {
      let profilePhotoUrl: string | null = null;
    
      if (userInput.photo) {
        try {
          profilePhotoUrl = await handleUploadImageToStorage("users", userInput.photo);
        } catch (uploadError) {
          console.error("Erro ao fazer upload da imagem:", uploadError);
          throw new Error("Erro ao enviar a foto de perfil. Tente novamente.");
        }
      }

      const customer = {
        "first_name": userInput.firstName,
        "last_name": userInput.lastName,
        "email": userInput.email,
        "phone": userInput.phone,
        "password": userInput.password,
        "photo": profilePhotoUrl
      };
      const response = await api.post("/auth/user/customer", customer);
        
      return response.data;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      await login({ email: userInput.email!, password: userInput.password! });
    }
  }

  async function createProfessional(professionalInput: Professional) {
    try {
      let profilePhotoUrl: string | null = null;
    
      if (professionalInput.photo) {
        try {
          profilePhotoUrl = await handleUploadImageToStorage("users", professionalInput.photo);
        } catch (uploadError) {
          console.error("Erro ao fazer upload da imagem:", uploadError);
          throw new Error("Erro ao enviar a foto de perfil. Tente novamente.");
        }
      }

      const professional = {
        "first_name": professionalInput.firstName,
        "last_name": professionalInput.lastName,
        "category": professionalInput.category,
        "email": professionalInput.email,
        "phone": professionalInput.phone,
        "password": professionalInput.password,
        "photo": profilePhotoUrl,
        "time_slots": professionalInput.timeSlots.map(slot => ({
          day_of_week: slot.dayOfWeek,
          start_time: slot.startTime,
          end_time: slot.endTime
        }))
      };

      const response = await api.post("/auth/user/professional", professional, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
        
      await fetchProfessionals();
      return response.data;
    } catch(error) {
      console.error("Erro ao criar profissional:", error);
      throw error;
    }
  }

  const fetchProfessionals = async () => {
    try {
      const response = await api.get("/auth/user/admin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data;
      const admins: Professional[] = data.map((admin: ApiAdmin) => ({
        id: admin.id,
        firstName: admin.first_name,
        lastName: admin.last_name,
        email: admin.email,
        phone: admin.phone,
        photo: admin.photo,
        type: admin.type,
        googleSub: admin.google_sub,
        category: admin.category,
        active: admin.active,
        timeSlots: admin.time_slots?.map(slot => ({
          dayOfWeek: slot.day_of_week,
          startTime: slot.start_time,
          endTime: slot.end_time
        })) || []
      }));
      setProfessionals(admins);
    } catch (error: unknown) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  const toggleProfessionalActive = async (professionalId: string | undefined, newActiveStatus: boolean) => {
    try {
      await api.put(
        `/auth/user/${professionalId}`,
        { active: newActiveStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await fetchProfessionals();
    } catch (error) {
      console.error("Erro ao alternar status do profissional:", error);
      throw error;
    }
  };

  const deleteProfessional = async (professionalId: string) => {
    if (!accessToken) {
      throw new Error("Usuário não autenticado.");
    }
  
    try {
      setLoading(true);
      await api.delete(`/auth/user/${professionalId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      await fetchProfessionals();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw new Error("Erro ao excluir usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        professionals,
        loading,
        refreshAccessToken,
        login,
        logout,
        createCustomer,
        createProfessional,
        fetchProfessionals,
        toggleProfessionalActive,
        deleteProfessional,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};