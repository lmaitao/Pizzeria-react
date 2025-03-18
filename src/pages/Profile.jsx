import '../components/Profile/Profile.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/Profile/Usercontext';

function Profile() {
  const staticEmail = 'usuario@ejemplo.com';
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p>Email: {staticEmail}</p>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;