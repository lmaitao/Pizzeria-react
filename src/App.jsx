import NavBar from "./components/NavBar/NavBar";
import Home from './components/Home/Home'
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
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>:
    </>
  );
};

export default App;
