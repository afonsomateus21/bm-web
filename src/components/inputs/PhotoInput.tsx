import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { useTranslation } from 'react-i18next';
import { PhotoInputProps } from '../../types';
import { forwardRef, Ref } from 'react';

function Input({ photoUrl, title, ...rest } : PhotoInputProps, ref: Ref<HTMLInputElement>) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center">
      <label 
        className="border-2 border-secondary border-dashed rounded-xl w-40 h-40 cursor-pointer relative shadow-xl"
      >
        {
          photoUrl ?
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `url(${photoUrl})`,
              backgroundSize: 'cover'
            }}
          >
          </div>
          :
          <UploadFileRoundedIcon 
            sx={{ 
              fontSize: 80, 
              color: '#333333',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }} 
          />
        }
        <input 
          { ...rest }
          ref={ ref }
          className="opacity-0"
          type="file"  
        />
      </label>

      <strong className="mt-5 text-tertiary">
        { title ?? t('Common.Register.ProfilePhoto') }
      </strong>
    </div>
  );
}

export const PhotoInput = forwardRef(Input);