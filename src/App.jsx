import NavBar from "./components/NavBar/NavBar";
import Pizzas from "./pages/Pizzas";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Pizzas />} />
          <Route path="/home" element={<Pizzas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
