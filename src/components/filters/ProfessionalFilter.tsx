import { ProfessionalFilterProps } from '../../types';
import { getPhotoUrl } from '../../utils';

export function ProfessionalFilter({ professionals, onSelect, selectedId }: ProfessionalFilterProps) {
  const handleSelect = (id: string) => {
    onSelect(id === selectedId ? null : id);
  };

  const validProfessionals = professionals
    .filter((professional) => professional.id)
    .map((professional) => {
      const photoUrl = getPhotoUrl(professional.profilePhoto);

      return {
        ...professional,
        photoUrl,
      };
    });

  return (
    <div className="my-6">
      <div className={`w-full px-4 flex 
        ${validProfessionals.length <= 3 ? 'justify-evenly' : 'justify-start'} 
        gap-6 
        overflow-x-auto 
        scrollbar-hide 
        py-2
      `}>
        {validProfessionals.map((professional) => (
          <button
            key={professional.id}
            onClick={() => handleSelect(professional.id!)}
            className={`
              flex 
              flex-col 
              items-center
              transition-all duration-300 ease-in-out
              ${validProfessionals.length <= 3 ? 'flex-1 max-w-[120px]' : 'flex-none'}
            `}
          >
            <div
              className={`
                w-16 h-16 rounded-full
                outline-4
                transition-all duration-300 ease-in-out
                ${
                  professional.id === selectedId
                    ? 'outline-tertiary scale-110'
                    : 'outline-secondary opacity-70'
                }
              `}
            >
              <img
                src={professional.photoUrl}
                alt={professional.firstName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="mt-3 text-sm font-bold">
              {professional.firstName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}