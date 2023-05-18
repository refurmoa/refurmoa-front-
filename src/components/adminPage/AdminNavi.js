// 관리자 페이지 메뉴

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminNavi.css";

const AdminNavi = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const login_id = window.sessionStorage.getItem("member_id");
    if (login_id !== "admin") navigate("/login");
  }, []);

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const linkStyle = (link) => {
    return currentPath === "/admin" ? "main"
        : currentPath === link ? "active" : "";
  }

  return (
    <>
        <div className="AN-wrap">
            <div className="AN-nav_wrap">
                <Link className={`AN-nav AN-nav_${linkStyle("/admin/order")}`}
                    to="/admin/order" onClick={() => setCurrentPath("/admin/order")}>
                    주문/배송
                    <span className={`AN-line AN-line_${linkStyle("/admin/order")}`}></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin/user")}`}
                    to="/admin/user" onClick={() => setCurrentPath("/admin/user")}>
                    회원
                    <span className={`AN-line AN-line_${linkStyle("/admin/user")}`}></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin/partner")}`}
                    to="/admin/partner" onClick={() => setCurrentPath("/admin/partner")}>
                    제휴회사
                    <span className={`AN-line AN-line_${linkStyle("/admin/partner")}`}></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin/banner")}`}
                    to="/admin/banner" onClick={() => setCurrentPath("/admin/banner")}>
                    배너
                    <span className={`AN-line AN-line_${linkStyle("/admin/banner")}`}></span>
                </Link>
                
                <Link className={`AN-nav AN-nav_${linkStyle("/admin")}`} to="/prod/write">
                    상품등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin")}`} to="/post/write">
                    판매등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin")}`} to="/cs/notice/write">
                    공지등록
                    <span className="AN-line"></span>
                </Link>
                <Link className={`AN-nav AN-nav_${linkStyle("/admin")}`} to="/cs/inquiry">
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
