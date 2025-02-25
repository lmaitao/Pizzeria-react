import '../components/Profile/Profile.css'

function Profile({ onLogout }) {
  const staticEmail = 'usuario@ejemplo.com';

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p>Email: {staticEmail}</p>
      <button className="logout-button" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;