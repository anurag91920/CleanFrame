import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Result from './pages/Result';
import Footer from './components/Footer';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider> {/* ✅ Context Provider लगाया */}
      <div className='container mx-auto'> {/* ✅ max-auto -> mx-auto */}
        <div className='w-full h-full'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/result' element={<Result />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
