import { ServiceScheduledProps } from "../../types";
import PersonIcon from '@mui/icons-material/Person';

export function ServiceScheduled({
  photo,
  serviceTitle,
  professional,
  date,
  hour,
  ...rest
}: ServiceScheduledProps) {
  return (
    <div 
      { ...rest }
      className="w-full h-32 rounded-2xl border-1 shadow-xl relative p-5"
    >
      <div 
        className="size-20 rounded-xl absolute top-1/2 -translate-y-1/2 z-10"
        style={
          photo 
          ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } 
          : { backgroundColor: 'gray' }
        }
      ></div>

      <div className="w-full flex justify-center">
        <div className="flex flex-col">
          <strong>{ serviceTitle }</strong>
          <div className="w-full relative">
            <PersonIcon 
              htmlColor="#EF007F"
              fontSize="small"
              className="m-0 p-0 absolute -left-1"
            />
            <span className="ml-5">
              { professional }
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 rounded-b-2xl bg-secondary w-full h-12 flex justify-center">
        <strong className="text-primary text-center">{ `${date} às ${hour}` }</strong>
      </div>
    </div>
  );
}