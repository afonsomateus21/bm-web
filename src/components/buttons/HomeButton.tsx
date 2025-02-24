import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router';

export function HomeButton() {
  return (
    <Link to="/home">
      <HomeIcon 
        htmlColor={'black'} 
        fontSize={ 'large' }
      />
    </Link>
  );
}