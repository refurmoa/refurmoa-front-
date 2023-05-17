// 관리자 페이지 메뉴

import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./AdminNavi.css";

const AdminNavi = () => {
  const [activeLink, setActiveLink] = useState("admin");

  const handleLink = (link) => {
    setActiveLink(link);
  };

  const linkStyle = (link) => {
    return activeLink === "admin" ? "main"
        : activeLink === link ? "active" : "";
  }

  return (
    <>
        <div className="AN-wrap">
            <div className="AN-nav_wrap">
                <NavLink className={`AN-nav AN-nav_${linkStyle("order")}`}
                    to="/admin/order" onClick={() => handleLink("order")}>
                    주문/배송
                    <span className={`AN-line AN-line_${linkStyle("order")}`}></span>
                </NavLink>
                <NavLink className={`AN-nav AN-nav_${linkStyle("user")}`}
                    to="/admin/user" onClick={() => handleLink("user")}>
                    회원
                    <span className={`AN-line AN-line_${linkStyle("user")}`}></span>
                </NavLink>
                <NavLink className={`AN-nav AN-nav_${linkStyle("partner")}`}
                    to="/admin/partner" onClick={() => handleLink("partner")}>
                    제휴회사
                    <span className={`AN-line AN-line_${linkStyle("partner")}`}></span>
                </NavLink>
                <NavLink className={`AN-nav AN-nav_${linkStyle("benner")}`}
                    to="/admin/banner" onClick={() => handleLink("benner")}>
                    배너
                    <span className={`AN-line AN-line_${linkStyle("banner")}`}></span>
                </NavLink>
                
                <Link className={`AN-nav AN-nav_${linkStyle("admin")}`} to="/prod/write">
                    상품등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("admin")}`} to="/post/write">
                    판매등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("admin")}`} to="/cs/notice/write">
                    공지등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("admin")}`} to="/cs/inquiry">
                    1:1 문의
                    <span className="AN-line"></span>
                </Link>
            </div>
        </div>
        <hr className="AN-bottom_line" />
        <Outlet />
    </>
  );
};

export default AdminNavi;
