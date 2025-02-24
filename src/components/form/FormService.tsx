import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { ChangeEvent, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FlatButton, PhotoInput, Spinner, HeaderNavigation, CustomSelect } from '../';
import { RegisterServiceFormInputProps, Service, FormServiceProps, Professional } from '../../types';
import { registerServiceSchema, getPhotoUrl, formatName } from '../../utils';
import { useService, useAuth } from '../../hooks';
import { useForm, Controller } from "react-hook-form";

export function FormService({ action, serviceId }: FormServiceProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { 
    register, 
    setValue, 
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset
  } = useForm<RegisterServiceFormInputProps>({
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      price: 0,
      category: "",
      professionalId: ""
    },
    resolver: yupResolver(registerServiceSchema(t))
  });

  const [uploadedServiceImage, setUploadedServiceImage] = useState("");
  const { createService, updateService, getServiceById, loading } = useService();
  const { professionals } = useAuth();

  const title = watch("title", "");
  const description = watch("description", "");
  const selectedCategory = watch("category", "");

  const categories = [
    { label: t("Category.LASHES"), value: "LASHES" },
    { label: t("Category.NAILS"), value: "NAILS" },
    { label: t("Category.FOOT_HAND"), value: "FOOT_HAND" },
    { label: t("Category.HAIR"), value: "HAIR" },
  ];
  
  const durationOptions = [
    { label: "30 minutos", value: 30 },
    { label: "45 minutos", value: 45 },
    { label: "1 hora", value: 60 },
    { label: "1 hora e 15 minutos", value: 75 },
    { label: "1 hora e 30 minutos", value: 90 },
    { label: "1 hora e 45 minutos", value: 105 },
    { label: "2 horas", value: 120 },
    { label: "2 horas e 30 minutos", value: 150 },
    { label: "3 horas", value: 180 },
  ];

  const filteredProfessionals = professionals.filter(
    (prof: Professional) => prof.category === selectedCategory
  );

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
    
    console.log(servicePayload);
    
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
          <Controller 
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect 
                title={t('Services.Form.Fields.Category')}
                options={categories}
                value={field.value}
                onChange={field.onChange}
                errors={errors?.category?.message}
              />
            )}
          />
          <Controller 
            name="professionalId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect 
                title={t('Services.Form.Fields.Professional')}
                options={filteredProfessionals
                  .filter((prof: Professional) => prof.id)
                  .map((prof: Professional) => ({
                    label: formatName(prof),
                    value: prof.id!,
                  }))}
                value={field.value}
                onChange={field.onChange}
                errors={errors?.professionalId?.message}
                disabled={!selectedCategory}
              />
            )}
          />

          <Controller 
            name="duration"
            control={control}
            defaultValue={30}
            render={({ field }) => (
              <CustomSelect 
                title={t('Services.Form.Fields.Duration')}
                options={durationOptions.map(opt => ({
                  label: opt.label,
                  value: opt.value.toString(),
                }))}
                value={field.value.toString()}
                onChange={(value) => field.onChange(Number(value))}
                errors={errors?.duration?.message}
              />
            )}
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