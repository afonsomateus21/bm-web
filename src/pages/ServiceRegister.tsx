import { useNavigate } from "react-router";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FlatButton, PhotoInput, Spinner } from '../components';
import { RegisterServiceFormInputProps, Service } from '../types';
import { registerServiceSchema } from '../utils';
import { useService } from '../hooks';
import { useTranslation } from 'react-i18next';

export function ServiceRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    register, 
    setValue, 
    handleSubmit,
    watch,
    formState: { errors }
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
  const { createService, loading } = useService();

  const title = watch("title", "");
  const description = watch("description", "");

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
      await createService(servicePayload);
      navigate("/services");
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
    }
  } 

  return (
    <main className="h-screen flex flex-col justify-evenly overflow-hidden px-5">
      <button 
        onClick={() => navigate('/services')}
        className="underline text-md self-start ml-2"
      >
        { t('Common.Buttons.Back') }
      </button>
      <h1 className="text-4xl text-center font-bold">
        { t('Common.Register.Title') }
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
            type="category" 
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
              title={ `${t('Common.Buttons.Register')}` } 
            />
          )}
        </div>
      </form>
    </main>
  );
}