import { useNavigate } from "react-router";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FlatButton, PhotoInput } from '../components';
import { RegisterFormInputProps, User } from '../types';
import { formatPhone, registerSchema } from '../utils';
import { useAuth, useShowPassword } from '../hooks';
import { useTranslation } from 'react-i18next';

export function UserRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    register, 
    setValue, 
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormInputProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(registerSchema(t))
  });
  const { showPassword } = useShowPassword();
  const [ formattedPhone, setFormattedPhone ] = useState("");
  const [ uploadedProfileImage, setUploadedProfileImage ] = useState("");
  const { createCustomer } = useAuth();

  const firstName = watch("firstName", "");
  const lastName = watch("lastName", "");

  function handleChangePhone(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatPhone(event.target.value);
    setFormattedPhone(formattedValue);
    setValue("phone", formattedValue)
  }

  function handleTextChange(field: keyof RegisterFormInputProps, value: string) {
    const onlyLetters = value.replace(/\d/g, "");
    setValue(field, onlyLetters);
  }

  async function handleChangePhoto(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const img = URL.createObjectURL(file);
      setUploadedProfileImage(img);

      setValue("profilePhoto", file);
    }
  }

  async function onSubmit(data: RegisterFormInputProps) {
    const userPayload: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      photo: data.profilePhoto
    };
    
    try {        
      await createCustomer(userPayload);
    } catch(error) {
      console.log(error);
    }
  } 

  return (
    <main className="h-screen flex flex-col justify-evenly overflow-hidden px-5">
      <button 
        onClick={() => navigate(-1)}
        className="underline text-md ml-2 self-start"
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
          photoUrl={ uploadedProfileImage }
          onChange={ handleChangePhoto }
        />
        <div className="w-full flex flex-col items-center h-[500px] overflow-y-scroll p-2 gap-6 mt-5">
          <FormInput 
            title={ `${t('Common.Form.Fields.FirstName')}` }
            placeholder={ `${t('Common.Form.Placeholders.FirstName')}` }
            value={firstName}
            required
            { ...register("firstName") }
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange("firstName", e.target.value)}
            errors={ errors?.firstName?.message }
          />
          <FormInput 
            title={ `${t('Common.Form.Fields.LastName')}` } 
            placeholder={ `${t('Common.Form.Placeholders.LastName')}` }
            value={lastName}
            required
            { ...register("lastName") }
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange("lastName", e.target.value)}
            errors={ errors?.lastName?.message }
          />
          <FormInput 
            title={ `${t('Common.Form.Fields.Email')}` } 
            type="email" 
            placeholder={ `${t('Common.Form.Placeholders.Email')}` }
            required
            { ...register("email") }
            errors={ errors?.email?.message }
          />
          <FormInput 
            title={ `${t('Common.Form.Fields.Phone')}` } 
            placeholder={ `${t('Common.Form.Placeholders.Phone')}` }
            required
            value={ formattedPhone }
            { ...register("phone") }
            onChange={ handleChangePhone }
            maxLength={ 15 }
            errors={ errors?.phone?.message }
          />
          <FormInput 
            title={ `${t('Common.Form.Fields.Password')}` } 
            type={ showPassword ? "text" : "password" } 
            placeholder={ `${t('Common.Form.Placeholders.Password')}` }
            required
            { ...register("password") }
            icon={ 
              showPassword ? 
                <VisibilityOffIcon 
                  htmlColor={'gray'} 
                  fontSize={ 'large' }
                /> 
              :
                <VisibilityIcon 
                  htmlColor={'gray'} 
                  fontSize={ 'large' }
                /> 
            }
            errors={ errors?.password?.message }
          />
          <FormInput 
            title={ `${t('Common.Form.Fields.PasswordConfirmation')}` } 
            type={ showPassword ? "text" : "password" }
            placeholder={ `${t('Common.Form.Placeholders.PasswordConfirmation')}` }
            required
            { ...register("confirmPassword") }
            icon={ 
              showPassword ? 
                <VisibilityOffIcon 
                  htmlColor={'gray'} 
                  fontSize={ 'large' }
                /> 
              :
                <VisibilityIcon 
                  htmlColor={'gray'} 
                  fontSize={ 'large' }
                /> 
            }
            errors={ errors?.confirmPassword?.message }
          />
        </div>

        <div className="w-[90%] mt-8">
          <FlatButton 
            type="submit" 
            title={ `${t('Common.Buttons.Register')}` } 
          />
        </div>
      </form>
    </main>
  );
}