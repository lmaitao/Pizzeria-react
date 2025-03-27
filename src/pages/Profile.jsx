import { useState, useEffect, useContext } from 'react';
import '../components/Profile/Profile.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/Profile/Usercontext';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { email, logout, getProfile } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userData = await getProfile();
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>Error al cargar el perfil: {error}</p>;
  }

  if (!user) {
    return <p>No se pudo obtener el perfil.</p>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p>Email: {email}</p>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;