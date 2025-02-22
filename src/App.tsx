import { RouterProvider } from 'react-router';
import './index.css'
import { router } from './routes';
import { AuthProvider, PasswordProvider, ServiceProvider } from './contexts';
import './i18n.ts';

function App() {
  return (
    <div className='bg-primary h-screen'>
      <AuthProvider>
        <PasswordProvider>
          <ServiceProvider>
            <RouterProvider router={ router } />
          </ServiceProvider>
        </PasswordProvider>
      </AuthProvider>
    </div>
  );
}

export default App;