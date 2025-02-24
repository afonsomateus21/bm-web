import { useNavigate, useParams } from "react-router";
import { ChangeEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FlatButton, PhotoInput, Spinner, HeaderNavigation } from '../';
import { RegisterServiceFormInputProps, Service, FormServiceProps } from '../../types';
import { registerServiceSchema, getPhotoUrl } from '../../utils';
import { useService } from '../../hooks';
import { useTranslation } from 'react-i18next';

export function FormService({ action, serviceId }: FormServiceProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { 
    register, 
    setValue, 
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<RegisterServiceFormInputProps>({
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      price: 0,
      category: "",
      professionalId: ""
    },
    resolver: yupResolver(registerServiceSchema(t))
  });

  const [uploadedServiceImage, setUploadedServiceImage] = useState("");
  const { createService, updateService, getServiceById, loading } = useService();

  const title = watch("title", "");
  const description = watch("description", "");

  useEffect(() => {
    if (action === "edit" && serviceId) {
      const fetchService = async () => {
        try {
          const service = await getServiceById(serviceId);
          if (service) {
            reset({
              title: service.title,
              description: service.description,
              duration: service.duration,
              price: service.price,
              category: service.category,
              professionalId: service.professionalId,
            });
            setUploadedServiceImage(getPhotoUrl(service.photo));
          }
        } catch (error) {
          console.error("Erro ao carregar serviço:", error);
        }
      };
      fetchService();
    }
  }, [action, serviceId, reset, getServiceById]);

  function handleTextChange(field: keyof RegisterServiceFormInputProps, value: string) {
    const onlyLetters = value.replace(/\d/g, "");
    setValue(field, onlyLetters);
  }

  async function handleChangePhoto(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const img = URL.createObjectURL(file);
      setUploadedServiceImage(img);

      setValue("servicePhoto", file);
    }
  }

  async function onSubmit(data: RegisterServiceFormInputProps) {
    const servicePayload: Service = {
      title: data.title,
      description: data.description,
      category: data.category,
      professionalId: data.professionalId,
      price: data.price,
      duration: data.duration,
      photo: data.servicePhoto
    };
    
    try {
      if (action === "create") {
        await createService(servicePayload);
      } else if (action === "edit" && id) {
        await updateService(id, servicePayload);
      }
      navigate("/services");
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  } 

  return (
    <main className="h-screen flex flex-col justify-evenly overflow-hidden px-5">
      <HeaderNavigation backRoute="/services" showHomeButton={false} />
      <h1 className="text-4xl text-center font-bold">
        { action === "create" ? t('Services.Form.CreateTitle') : t('Services.Form.EditTitle') }
      </h1>
      <form 
        className="h-4/5 flex flex-col items-center justify-evenly"
        onSubmit={ handleSubmit(onSubmit) }
      >
        <PhotoInput 
          photoUrl={ uploadedServiceImage }
          onChange={ handleChangePhoto }
          title={ `${t('Services.Form.Fields.Photo')} `}
        />
        <div className="w-full flex flex-col items-center h-[500px] overflow-y-scroll p-2 gap-6 mt-5">
          <FormInput 
            title={ `${t('Services.Form.Fields.Title')}` }
            placeholder={ `${t('Services.Form.Placeholders.Title')}` }
            value={title}
            required
            { ...register("title") }
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange("title", e.target.value)}
            errors={ errors?.title?.message }
          />
          <FormInput 
            title={ `${t('Services.Form.Fields.Description')}` } 
            placeholder={ `${t('Services.Form.Placeholders.Description')}` }
            value={description}
            required
            { ...register("description") }
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange("description", e.target.value)}
            errors={ errors?.description?.message }
          />
          <FormInput 
            title={ `${t('Services.Form.Fields.Category')}` } 
            placeholder={ `${t('Services.Form.Placeholders.Category')}` }
            required
            { ...register("category") }
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange("category", e.target.value)}
            errors={ errors?.category?.message }
          />
          <FormInput 
            title={ `${t('Services.Form.Fields.Professional')}` } 
            placeholder={ `${t('Services.Form.Placeholders.Professional')}` }
            required
            { ...register("professionalId") }
            errors={ errors?.professionalId?.message }
          />
          <FormInput 
            title={ `${t('Services.Form.Fields.Duration')}` }
            type="number"
            placeholder={ `${t('Services.Form.Placeholders.Duration')}` }
            required
            maxLength={ 3 }
            min={ 1 }
            { ...register("duration") }
            errors={ errors?.duration?.message }
          />
          <FormInput 
            title={ `${t('Services.Form.Fields.Price')}` }
            type="number"
            placeholder={ `${t('Services.Form.Placeholders.Price')}` }
            required
            { ...register("price") }
            maxLength={ 9 }
            min={ 0 }
            errors={ errors?.price?.message }
          />
        </div>

        <div className="w-[90%] mt-8">
          {loading ? (
            <div className="flex justify-center">
              <Spinner color="#EF007F" />
            </div>
          ) : (
            <FlatButton 
              type="submit"
              title={ action === "create" ? t('Common.Buttons.Register') : t('Common.Buttons.Save') } 
            />
          )}
        </div>
      </form>
    </main>
  );
}