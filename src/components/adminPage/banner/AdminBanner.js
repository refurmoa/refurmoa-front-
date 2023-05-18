import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminBanner.css";
import search from "../../../images/search.png";
import List from "./BannerList.json";
import axios from "axios";

const AdminBanner = () => {
  const [bannList, setBannList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect = () => {
    // axios
    //   .get("/api/banner")
    //   .then((res) => {
    //     const { data } = res;
    //     setBannList(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // console.log(data);
  };
  const searchBanner = () => {
    // axios
    //   .get("/api/banner"){
    //          input:searchInput
    //      }
    //   .then((res) => {
    //     const { data } = res;
    //     setBannList(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // console.log(data);
  };

  return (
    <>
      <div className="BN_wrap">
        <div className="BN_header">
          <span>배너관리</span>
          <button>등록</button>
          <div className="BN_search">
            <input
              placeholder="업체명"
              maxLength="15px"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>
            <img src={search} onClick={searchBanner} />
          </div>
        </div>
        <div className="BN_content">
          {List.map((item) => (
            <div className="BN_banner">
              <div className="BN_banner_num">{item.bann_num}</div>

              <div className="BN_banner_img">
                <Link to="/banner/update" state={{ item }}>
                  <img
                    src={`${process.env.PUBLIC_URL}` + item.bann_image}
                  ></img>
                </Link>
              </div>

              <div className="BN_banner_info">
                <Link to="/banner/update" state={{ item }}>
                  <div>{item.seller_name}</div>
                  <div>{item.seller_phone}</div>
                </Link>
              </div>

              <div className="BN_banner_date">
                <a href={item.bann_link}>{item.bann_link}</a>
                <div className="BN_banner_date_info">
                  {item.bann_start}~{item.bann_end}
                </div>
              </div>
              <div className="BN_banner_delete">삭제</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBanner;
