import { useNavigate } from "react-router";
import { HomeOptionProps } from "../../types";

export function HomeOption({ title, description, imageUrl, redirectTo }: HomeOptionProps) {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(redirectTo);
  }

  return (
    <div 
      className="flex-1 max-h-[170px] rounded-2xl relative bg-cover shadow-2xl active:scale-105 transition-transform duration-300"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleRedirect}
    >
      <div 
        className="h-full w-full rounded-2xl absolute"
        style={{ 
          backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.3))',
        }}
      >
        <div
          className="w-full h-full relative px-8 py-5 flex flex-col justify-end"
        >
          <h1 className="text-3xl text-white font-extrabold">
            {title}
          </h1>
          <span className="text-md text-white font-medium mr-10">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}