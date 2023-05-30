// 고객센터 메뉴

import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./CsNavbar.css";

const CsNavbar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const linkStyle = (link) => {
    const startlink = new RegExp(`^${link}`);
    return startlink.test(currentPath) && "CS-nav_active";
  }

  return (
    <div className="CS-wrap">
      <span className="CS-nav_wrap">
        <div className="CS-title">고객센터</div>
        <hr className="CS-top_line" />
        <div className="CS-nav_bar">
          <Link className={`CS-nav ${linkStyle("/cs/notice")}`}
              to="/cs/notice" onClick={() => setCurrentPath("/cs/notice")}>
              공지사항
          </Link>
          <Link className={`CS-nav ${linkStyle("/cs/faq")}`}
              to="/cs/faq" onClick={() => setCurrentPath("/cs/faq")}>
              FAQ
          </Link>
          <Link className={`CS-nav ${linkStyle("/cs/inquiry")}`}
              to="/cs/inquiry" onClick={() => setCurrentPath("/cs/inquiry")}>
              1:1 문의하기
          </Link>
          { window.sessionStorage.getItem("id") === "admin" ?
            <Link className={`CS-nav ${linkStyle("/cs/as/admin")}`}
                to="/cs/as/admin" onClick={() => setCurrentPath("/cs/as/admin")}>
                A/S 매장 관리
            </Link>
            : <Link className={`CS-nav ${linkStyle("/cs/as")}`}
              to="/cs/as" onClick={() => setCurrentPath("/cs/as")}>
              A/S 매장 찾기
            </Link>
          }
          
        </div>
      </span>
      <Outlet />
    </div>
  );
};

export default CsNavbar;
