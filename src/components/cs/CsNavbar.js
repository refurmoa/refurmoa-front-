import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./CsNavbar.css";

const CsNavbar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <span className="CSnavbar">
      <Link className="CSnavtitle" to="/notice">
        고객센터
      </Link>
      <hr className="CSnavline" />
      <div className="CSnav_main">
        <NavLink
          to="/notice"
          className={`CSnavbarmenu ${activeLink === "notice" ? "active" : ""}`}
          onClick={() => handleLinkClick("notice")}
        >
          공지사항
        </NavLink>

        <NavLink
          to="/faq"
          className={`CSnavbarmenu ${activeLink === "faq" ? "active" : ""}`}
          onClick={() => handleLinkClick("faq")}
        >
          FAQ
        </NavLink>

        <NavLink
          to="/oneonone"
          className={`CSnavbarmenu ${
            activeLink === "oneonone" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("oneonone")}
        >
          1:1 문의하기
        </NavLink>

        <NavLink
          to="/as"
          className={`CSnavbarmenu ${activeLink === "as" ? "active" : ""}`}
          onClick={() => handleLinkClick("as")}
        >
          A/S 매장 찾기
        </NavLink>
      </div>
    </span>
  );
};

export default CsNavbar;
