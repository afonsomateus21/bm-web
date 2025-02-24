import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormInput, FlatButton, PhotoInput, HeaderNavigation, CustomSelect } from '../../components';
import { formatPhone, getPhotoUrl, registerProfessionalSchema } from '../../utils';
import { useAuth, useShowPassword } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { RegisterProfessionalFormInputProps } from '../../types';

interface FormProfessionalProps {
  isEdit?: boolean;
  professionalId?: string;
}

export function FormProfessional({ isEdit = false, professionalId }: FormProfessionalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showPassword } = useShowPassword();
  const [formattedPhone, setFormattedPhone] = useState("");
  const [uploadedProfileImage, setUploadedProfileImage] = useState("");
  const { createProfessional, updateProfessional, getProfessionalById } = useAuth();
  
  const { 
    register, 
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control
  } = useForm<RegisterProfessionalFormInputProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(registerProfessionalSchema(t))
  });

  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");

  const categories = [
    { label: t("Category.LASHES"), value: "LASHES" },
    { label: t("Category.NAILS"), value: "NAILS" },
    { label: t("Category.FOOT_HAND"), value: "FOOT_HAND" },
    { label: t("Category.HAIR"), value: "HAIR" },
  ];

  useEffect(() => {
    if (isEdit && professionalId) {
      const loadProfessionalData = async () => {
        try {
          const professional = await getProfessionalById(professionalId);
          const profilePhoto = getPhotoUrl(professional?.profilePhoto);
          if (professional) {
            reset({
              firstName: professional.firstName,
              lastName: professional.lastName,
              category: professional.category,
              email: professional.email,
              phone: professional.phone,
              profilePhoto: professional.profilePhoto,
            });
            setFormattedPhone(professional.phone);
            setUploadedProfileImage(profilePhoto);
          }
        } catch (error) {
          console.error("Erro ao carregar profissional:", error);
        }
      };
      loadProfessionalData();
    }
  }, [isEdit, professionalId, reset, getProfessionalById]);

  function handleChangePhone(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatPhone(event.target.value);
    setFormattedPhone(formattedValue);
    setValue("phone", formattedValue);
  }

  function handleTextChange(field: keyof RegisterProfessionalFormInputProps, value: string) {
    const onlyLetters = value.replace(/\d/g, "");
    setValue(field, onlyLetters);
  }

  function handleChangePhoto(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const img = URL.createObjectURL(file);
      setUploadedProfileImage(img);
      setValue("profilePhoto", file);
    }
  }

  async function onSubmit(data: RegisterProfessionalFormInputProps) {
    try {
      if (isEdit && professionalId) {
        await updateProfessional(professionalId, data);
      } else {
        await createProfessional(data);
      }
      navigate("/professionals");
    } catch (error) {
      console.error("Erro ao salvar profissional:", error);
    }
  }

  return (
    <main className="h-screen flex flex-col justify-evenly overflow-hidden px-5">
      <HeaderNavigation backRoute="/professionals" showHomeButton={false} />
      <h1 className="text-4xl text-center font-bold">
        {isEdit ? t('Professionals.Form.EditTitle') : t('Professionals.Form.CreateTitle')}
      </h1>
      <form 
        className="h-4/5 flex flex-col items-center justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PhotoInput 
          photoUrl={uploadedProfileImage}
          onChange={handleChangePhoto}
          title={t('Professionals.Form.Fields.Photo')}
        />
        <div className="w-full flex flex-col items-center h-[500px] overflow-y-scroll p-2 gap-6 mt-5">
          <FormInput 
            title={t('Professionals.Form.Fields.FirstName')}
            placeholder={t('Professionals.Form.Placeholders.FirstName')}
            value={firstName}
            required
            {...register("firstName")}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
              handleTextChange("firstName", e.target.value)}
            errors={errors?.firstName?.message}
          />
          <FormInput 
            title={t('Professionals.Form.Fields.LastName')}
            placeholder={t('Professionals.Form.Placeholders.LastName')}
            value={lastName}
            required
            {...register("lastName")}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
              handleTextChange("lastName", e.target.value)}
            errors={errors?.lastName?.message}
          />

          <Controller 
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomSelect 
                title={t('Professionals.Form.Fields.Category')}
                options={categories}
                value={field.value}
                onChange={field.onChange}
                errors={errors?.category?.message}
              />
            )}
          />

          <FormInput 
            title={t('Professionals.Form.Fields.Email')}
            type="email"
            placeholder={t('Professionals.Form.Placeholders.Email')}
            required
            {...register("email")}
            errors={errors?.email?.message}
          />
          <FormInput 
            title={t('Professionals.Form.Fields.Phone')}
            placeholder={t('Professionals.Form.Placeholders.Phone')}
            required
            value={formattedPhone}
            {...register("phone")}
            onChange={handleChangePhone}
            maxLength={15}
            errors={errors?.phone?.message}
          />
          {!isEdit && (
            <>
              <FormInput 
                title={t('Professionals.Form.Fields.Password')}
                type={showPassword ? "text" : "password"}
                placeholder={t('Professionals.Form.Placeholders.Password')}
                required
                {...register("password")}
                icon={showPassword ? 
                  <VisibilityOffIcon 
                    htmlColor="gray"
                    fontSize="large"
                  /> : 
                  <VisibilityIcon 
                    htmlColor="gray"
                    fontSize="large"
                  />
                }
                errors={errors?.password?.message}
              />
              <FormInput 
                title={t('Professionals.Form.Fields.PasswordConfirmation')}
                type={showPassword ? "text" : "password"}
                placeholder={t('Professionals.Form.Placeholders.PasswordConfirmation')}
                required
                {...register("confirmPassword")}
                icon={showPassword ? 
                  <VisibilityOffIcon 
                    htmlColor="gray"
                    fontSize="large"
                  /> : 
                  <VisibilityIcon 
                    htmlColor="gray"
                    fontSize="large"
                  />
                }
                errors={errors?.confirmPassword?.message}
              />
            </>
          )}
        </div>

        <div className="w-[90%] mt-8">
          <FlatButton 
            type="submit"
            title={isEdit ? t('Common.Buttons.Save') : t('Common.Buttons.Register')}
          />
        </div>
      </form>
    </main>
  );
}