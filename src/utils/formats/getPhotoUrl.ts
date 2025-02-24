export const getPhotoUrl = (photo: File | string | null | undefined): string => {
  if (photo instanceof File) {
    return URL.createObjectURL(photo);
  }
  if (typeof photo === 'string' && photo) {
    return photo;
  }
  return '~/src/assets/no_image.png';
};