import NavBar from "./components/NavBar/NavBar";
import Pizzas from './components/Pizzas/Pizzas'
import Footer from "./components/Footer/Footer";
import Register from './components/Register/Register';
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';



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
          </Routes>
          <Footer />
      </Router>
    </>
  );
};

export default App;
