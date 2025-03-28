import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/Profile/Usercontext';
import '../components/Profile/Profile.css';

const Profile = () => {
  const { getProfile, user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const profileData = await getProfile();
        if (isMounted) {
          console.log('Datos del perfil obtenidos:', profileData);
          setLoading(false);
          setProfileFetched(true);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error al obtener el perfil en Profile:', err);
          setError(err.message);
          setLoading(false);
          setProfileFetched(true);
        }
      }
    };

    if (!profileFetched) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [getProfile, profileFetched]);

  if (loading) return <p className="loading-message">Cargando perfil...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="profile-container">
      {user && (
        <>
          <h2>Perfil de Usuario</h2>
          <p>Email: {user.email}</p>
          <button className="logout-button" onClick={logout}>Cerrar Sesión</button>
        </>
      )}
    </div>
  );
};

export default Profile;