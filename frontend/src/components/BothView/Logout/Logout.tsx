import React from 'react';

interface LogoutButtonProps {
  onLogout?: () => void;
  buttonText?: string;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout,
  buttonText = 'Log ud',
  className = 'btn btn-danger', // Default Bootstrap button styling
}) => {
  
  const handleLogout = () => {
    // Perform logout actions here (e.g., clear session, remove tokens)
    console.log('User logged out');
    window.sessionStorage.clear();
    // Trigger any additional logout actions passed as a prop
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {buttonText}
    </button>
  );
};

export default LogoutButton;
