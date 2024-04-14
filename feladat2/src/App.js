import { Routes, Route, Link } from "react-router-dom";
import Kilatok from "./pages/Kilatok";
import Kepek from "./pages/Kepek";
import NoPage from './pages/NoPage';
import Home from './pages/Home';

function App() {

  return (
    <div>
      <header>
        <h1 className="text-center mt-3">Balatoni kilátók</h1>
      </header>
      <nav className="nav bg-dark justify-content-center mb-3">
        <Link className='nav-link link-light' to='/'>Kezdőlap</Link>
        <Link className='nav-link link-light' to='/kilatok'>Kilátók</Link>
        <Link className='nav-link link-light' to='/kepek'>Képek</Link>
      </nav>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path="/kilatok" element={<Kilatok />} />
          <Route path="/kepek" element={<Kepek />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <footer className="bg-secondary text-light">
        <p className="text-center">Készítette: Tóth József</p>
      </footer>
    </div>

  );
}

export default App;
