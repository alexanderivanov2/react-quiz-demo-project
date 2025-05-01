import React from 'react'
import logoImg from '../assets/quiz-logo.png'
function Header() {
  return (
    <header>
        <img src={logoImg} alt="react quiz logo" />
        <h1>REACT QUIZ</h1>
    </header>
  );
}

export default Header