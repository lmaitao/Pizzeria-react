import { useContext } from "react";
import NavBar from "./components/NavBar/NavBar";
import Pizzas from "./pages/Pizzas";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ErrorBoundary from "./Error";
import { CartProvider } from "./components/Cart/Cartcontext";
import { UserContext, UserProvider } from './components/Profile/Usercontext'; // Importa el contexto

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <CartProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </CartProvider>
      </ErrorBoundary>
    </Router>
  );
};

const AppContent = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext); // Usa el contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  const RedirectIfLoggedIn = ({ element }) => {
    return isLoggedIn ? <Navigate to="/" /> : element;
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn
              element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn
              element={<Register onRegisterSuccess={() => setIsLoggedIn(true)} />}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile onLogout={handleLogout} />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;