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
import ProtectedRoute from "./ProtectedRoute";

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
  const { token } = useContext(UserContext);

  const RedirectIfLoggedIn = ({ children }) => {
    return token ? <Navigate to="/home" /> : children;
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/pizzas" element={<ProtectedRoute> <Pizzas /> </ProtectedRoute>} />
        <Route path="/login" element={<RedirectIfLoggedIn> <Login /> </RedirectIfLoggedIn>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;