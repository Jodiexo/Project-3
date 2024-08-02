import React from 'react';
import {
  FaSun,
  FaMoon,
  FaDoorOpen,
  FaEnvelope,
  FaComments,
  FaAddressBook,
} from 'react-icons/fa';
import '../styles/NavBar.css';

const NavBar = ({ darkMode, toggleDarkMode, setCurrentView, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-bottom">
        <li>
          <button onClick={() => setCurrentView('chats')}>
            <FaComments size={24} />
            <span>Chats</span>
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentView('messages')}>
            <FaEnvelope size={24} />
            <span>Direct Messages</span>
          </button>
        </li>
        <li className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </li>
        <li>
          <button onClick={() => setCurrentView('contacts')}>
            <FaAddressBook size={24} />
            <span>Contacts</span>
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            <FaDoorOpen size={24} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;





