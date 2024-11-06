import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import showAlert from '../Alert/AlertFunction';

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
    // Show an alert before logging out
    showAlert({
      title: 'Log ud',
      message: 'Er du sikker på, at du vil logge ud?',
      onConfirm: async () => {
        if (onLogout) {
          await onLogout();
        }
        try {
          // API call to the logout endpoint
          await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
          
          console.log('User logged out');
          
          // Delete authIndicator from cookies
          document.cookie = 'authIndicator=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

          // Clears session storage
          window.sessionStorage.clear();
        } catch (error) {
          console.error('Error logging out', error);
        }

        navigate('/login');
      },
    });
  };

  return (
    <button onClick={handleLogout} className={className}>
      {buttonText}
    </button>
  );
};

export default LogoutButton;
