import "./Header.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo-header.svg";

const Header = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <div className="H-wrap">
      <svg className="H-top_line"><rect className="H-line_box" /></svg>
      <svg className="H-top_shape" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H223L156.852 86H49.6112L0 0Z" fill="#B9A89A"/>
      </svg>
      <Logo />

      <div className="H-nav_wrap">
        
      </div>
    </div>
  )
}

export default Header;