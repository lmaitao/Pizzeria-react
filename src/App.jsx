import { useContext } from "react";
import NavBar from "./components/NavBar/NavBar";
import Pizzas from "./pages/Pizzas";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./Error";
import { CartProvider } from "./components/Cart/Cartcontext";
import { UserContext, UserProvider } from './components/Profile/Usercontext';

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
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  // eslint-disable-next-line react/prop-types
  const RedirectIfLoggedIn = ({ element }) => {
    return isLoggedIn ? <Navigate to="/" /> : element;
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
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
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;