import SearchIcon from '@mui/icons-material/Search';
import { SearchBarProps } from '../../types';

export function SearchBar({ 
  placeholder, 
  onSearch,
  className = ''
}: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-6">
      <div className={`w-full mx-auto relative rounded-xl  bg-white h-16 flex items-center px-3 border-2 border-tertiary ${className}`}>
        <input 
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          className="outline-none border-none w-full p-4 text-sm placeholder:semi-bold placeholder:opacity-60"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon
            fontSize="large"
            className="text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}