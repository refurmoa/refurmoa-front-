import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo-header.svg";

function Header() {
  const login_id = window.sessionStorage.getItem("member_id");
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [ringlist, setRinglist] = useState(null); // 알림 리스트
  const [searchData, setSearchData] = useState(); // 검색어
  const [ringOpen, setRingOpen] = useState(false); // 알림창 열기
  const [searchOpen, setSearchOpen] = useState(false); // 검색창 열기

  const linkStyle = (link) => {
    const startlink = new RegExp(`^${link}`);
    return currentPath === "/" ? "H-nav_main"
    : startlink.test(currentPath) ? "H-nav_active" : "";
  }

  useEffect(() => {
    // 알림 조회
    // setRinglist();
  }, [])

  // 검색창
  const searchChange = () => {
    if (!searchOpen) setSearchOpen(true);
    else search();
  }

  // 검색
  const search = () => {

  }


  return (
    <div className="H-wrap">
      <svg className="H-top_line"><rect className="H-line_box" /></svg>
      <svg className="H-top_shape" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H223L156.852 86H49.6112L0 0Z" fill="#B9A89A"/>
      </svg>
      <Link to="/" onClick={() => setCurrentPath("/")}><Logo /></Link>

      <div className="H-nav_wrap">
        <span className="H-nav_left">
          <span className="H-nav H_icon H-search" onClick={() => {searchChange()}}>
            
            {searchOpen &&
              <input type="text" id="search" name="search" maxLength="20"
              value={searchData} onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={(e) => {if (e.key === 'Enter') search();}} />
            }
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#B9A89A" d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
            </svg>
          </span>
          <Link className={`H-nav H_text ${linkStyle("/post")}`}
              to="/post" onClick={() => setCurrentPath("/post")}>
              order
          </Link>
          <Link className={`H-nav H_text ${linkStyle("/about")}`}
              to="/about" onClick={() => setCurrentPath("/about")}>
              about
          </Link>
          <Link className={`H-nav H_text ${linkStyle("/cs")}`}
              to="/cs/notice" onClick={() => setCurrentPath("/cs")}>
              c/s
          </Link>
        </span>
        <span className="H-nav_right">
          { login_id === null ? <>
            <Link className={`H-nav H_text ${linkStyle("/login")}`}
              to="/login" onClick={() => setCurrentPath("/login")}>
              login
            </Link>
            <Link className={`H-nav H_text ${linkStyle("/signup")}`}
                to="/signup" onClick={() => setCurrentPath("/signup")}>
                join
            </Link>
            </> : <>
            { login_id === "admin" ?
              <Link className={`H-nav H_text ${linkStyle("/admin")}`}
                to="/admin" onClick={() => setCurrentPath("/admin")}>
                admin
              </Link>
              : <Link className={`H-nav H_text ${linkStyle("/mypage")}`}
                to="/mypage" onClick={() => setCurrentPath("/mypage")}>
                mypage
              </Link> }
            
            <span className="H-nav H_icon" onClick={() => {setRingOpen(true)}}>
              { ringlist !== null ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#514438" d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.778-11.679c.18.721.05 1.446-.304 2.035l.97.584c.504-.838.688-1.869.433-2.892-.255-1.024-.9-1.848-1.739-2.351l-.582.97c.589.355 1.043.934 1.222 1.654zm.396-4.346l-.597.995c1.023.616 1.812 1.623 2.125 2.874.311 1.251.085 2.51-.53 3.534l.994.598c.536-.892.835-1.926.835-3-.001-1.98-1.01-3.909-2.827-5.001zm-16.73 2.692l-.582-.97c-.839.504-1.484 1.327-1.739 2.351-.255 1.023-.071 2.053.433 2.892l.97-.584c-.354-.588-.484-1.314-.304-2.035.179-.72.633-1.299 1.222-1.654zm-4.444 2.308c0 1.074.299 2.108.835 3l.994-.598c-.615-1.024-.841-2.283-.53-3.534.312-1.251 1.101-2.258 2.124-2.873l-.597-.995c-1.817 1.092-2.826 3.021-2.826 5z"/>
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#B9A89A" d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/>
                </svg>
              }
            </span>
            <span className="H-nav H_icon" onClick={() => {window.sessionStorage.clear();}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#B9A89A" d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
              </svg>
            </span>
          </> }
        </span>
      </div>
    </div>
  )
}

export default Header;