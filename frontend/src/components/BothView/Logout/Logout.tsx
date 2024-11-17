import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import showAlert from '../Alert/AlertFunction';
import { AuthContext } from './AuthContext';

interface LogoutButtonProps {
  buttonText?: string;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  buttonText = 'Log ud',
  className = 'btn btn-danger',
}) => {
  const navigate = useNavigate();
  const { setUserRole } = useContext(AuthContext);

  const handleLogout = async () => {
    showAlert({
      title: 'Log ud',
      message: 'Er du sikker på, at du vil logge ud?',
      onConfirm: async () => {
        try {
          await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
          setUserRole(null);
          document.cookie = 'authIndicator=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          sessionStorage.clear();
          navigate('/login');
        } catch (error) {
          console.error('Error logging out', error);
        }
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
