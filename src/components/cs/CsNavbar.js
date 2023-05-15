// 고객센터 메뉴

import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./CsNavbar.css";

const CsNavbar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="CS-wrap">

    <span className="CSnavbar">
      <Link className="CSnavtitle" to="/cs/notice">
        고객센터
      </Link>
      <hr className="CSnavline" />
      <div className="CSnav_main">
        <NavLink
          to="/cs/notice"
          className={`CSnavbarmenu ${activeLink === "notice" ? "active" : ""}`}
          onClick={() => handleLinkClick("notice")}
        >
          공지사항
        </NavLink>

        <NavLink
          to="/cs/faq"
          className={`CSnavbarmenu ${activeLink === "faq" ? "active" : ""}`}
          onClick={() => handleLinkClick("faq")}
        >
          FAQ
        </NavLink>

        <NavLink
          to="/cs/inquiry"
          className={`CSnavbarmenu ${
            activeLink === "oneonone" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("oneonone")}
        >
          1:1 문의하기
        </NavLink>

        <NavLink
          to="/cs/as_store"
          className={`CSnavbarmenu ${activeLink === "as" ? "active" : ""}`}
          onClick={() => handleLinkClick("as")}
        >
          A/S 매장 찾기
        </NavLink>
      </div>
    </span>
    <Outlet />
    </div>
  );
};

export default CsNavbar;
