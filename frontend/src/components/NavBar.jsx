import logo from '../assets/RemoveLogo.png';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // CSS file

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <img
                onClick={() => navigate('/')}
                src={logo}
                alt="Logo"
                className="navbar-logo"
            />
            <div className="navbar-buttons">
                <button className="login-button" onClick={() => navigate('/register')}>
                    Register
                </button>
                <button className="login-button" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="login-button" onClick={() => navigate('/result')}>
                    Result
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
