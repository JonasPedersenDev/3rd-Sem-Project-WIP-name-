import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface LogoutButtonProps {
  onLogout?: () => void;
  buttonText?: string;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout,
  buttonText = 'Log ud',
  className = 'btn btn-danger', 
}) => {
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
      // API call to the logout endpoint
      await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
      
      console.log('User logged out');
      
      // Delete authIndicator from cookies
      document.cookie = 'authIndicator=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Clears session storage
      window.sessionStorage.clear();
      
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error logging out', error);
    }

   navigate('/login');

  };

  return (
    <button onClick={handleLogout} className={className}>
      {buttonText}
    </button>
  );
};

export default LogoutButton;