import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Pizzas from "./pages/Pizzas";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ErrorBoundary from "./Error";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
};

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register onRegisterSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;