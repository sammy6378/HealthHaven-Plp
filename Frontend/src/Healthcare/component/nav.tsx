import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
function Nav() {
    const navigate = useNavigate();

  return (
    <nav className="section__container nav__container">
    <div className="nav__logo">Health<span>Haven</span> Healthcare</div>
    <ul className="nav__links">
      <li className="link">
        <button className="btn_home combined-btn">
          <span className="signup" onClick={() => navigate('/register')}>Sign Up</span>
          <span className="separator"> | </span>
          <span className="login" onClick={() => navigate('/login')}>Login</span>
        </button>
      </li>
    </ul>
    <div className="menu-icon" onClick={toggleMenu}>
      <i className="ri-menu-3-line"></i>
    </div>
  </nav>
  )
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav__links');
    navLinks?.classList.toggle('show');
  }

export default Nav