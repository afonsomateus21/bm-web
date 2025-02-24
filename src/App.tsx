import { RouterProvider } from 'react-router';
import './index.css'
import { router } from './routes';
import { AppointmentProvider, AuthProvider, PasswordProvider } from './contexts';
import './i18n.ts';

function App() {
  return (
    <div className='bg-primary h-screen'>
      <AuthProvider>
        <AppointmentProvider>
          <PasswordProvider>
            <RouterProvider router={ router } />
          </PasswordProvider>
        </AppointmentProvider>
      </AuthProvider>
    </div>
  );
}

export default App
