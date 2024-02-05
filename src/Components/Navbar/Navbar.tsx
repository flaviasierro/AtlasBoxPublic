import { FaBars } from 'react-icons/fa';
import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


interface navBarProps {
  title?: string;
}
function MenuNav(props: navBarProps) {
  const navRef = React.useRef<HTMLElement>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  }
  return (
    <>
      <header>
        
        <Link to="/"  style={{ color: 'inherit', textDecoration: 'inherit'}}><h1>AtlasBox</h1></Link>
        <nav ref={navRef as React.RefObject<HTMLElement>}>
          <ul>
            <li><h2>{props.title?.toUpperCase()}</h2></li>
          </ul>
        </nav>

        <button onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

    </>

  );
}

export default MenuNav;
