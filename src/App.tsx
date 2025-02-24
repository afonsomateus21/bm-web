import { RouterProvider } from 'react-router';
import './index.css'
import { router } from './routes';
import { AuthProvider, PasswordProvider, ServiceProvider, AppointmentProvider } from './contexts';
import './i18n.ts';

function App() {
  return (
    <div className='bg-primary h-screen'>
      <AuthProvider>
        <AppointmentProvider>
          <PasswordProvider>
            <ServiceProvider>
              <RouterProvider router={ router } />
            </ServiceProvider>
          </PasswordProvider>
        </AppointmentProvider>
      </AuthProvider>
    </div>
  );
}

export default App;