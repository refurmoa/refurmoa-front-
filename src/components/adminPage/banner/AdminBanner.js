import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminBanner.css";
import search from "../../../images/search.png";
import List from "./BannerList.json";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const AdminBanner = () => {
  const navigate = useNavigate();
  const [bannList, setBannList] = useState([]);
  const searchRef = useRef();
  // 무한스크롤
  const [ref, inView] = useInView(); // 하단의 ref가 화면에 보여지면 inView 값이 true로 바뀜
  const [page, setPage] = useState(0);
  const [searchword, setSearchword] = useState();
  const [searchState, setSearchState] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  // 검색기능
  // 엔터키
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      searchBanner();
    }
  }
  // 검색상태일 때에는 useEffect에서 searchBanner을 호출
  const searchBanner = () => {
    // 검색기능을 사용하면 검색상태로 변경(전송할 axios를 구분하기 위해)
    setSearchState(true);
    // 처음 검색할때에는 기존의 bannList의 데이터를 비워주고 새로 받아온 데이터를 넣는다.
    if ((searchRef.current.value !== "") && (searchRef.current.value !== null) && (isFirstSearch)) {
      axios
      .get(`/admin/banner/search?search=${searchRef.current.value}&page=0&size=10`) 
      .then((res) => {
        const { data } = res;
        console.log(data);
        setBannList([...data.content]);
        setPage(1);
        setIsFirstSearch(false);
      })
      .catch((e) => {
        console.error(e);
      });
    // 검색후 하단의 ref div 박스를 만나면 기존의 검색데이터 + 다음 페이지 데이터를 bannList에 넣는다.
    } else if ((searchRef.current.value !== "") && (searchRef.current.value !== null) && (!isFirstSearch)) {
      axios
      .get(`/admin/banner/search?search=${searchRef.current.value}&page=${page}&size=10`) 
      .then((res) => {
        const { data } = res;
        setBannList([...bannList, ...data.content]);
        setPage((page) => page+1);
        setIsFirstSearch(false);
      })
      .catch((e) => {
        console.error(e);
      });
    }
  };

  const deleteHandler = (bannerNum) => {
    axios.get(`/admin/banner/delete?banner_num=${bannerNum}`)
    .then((res) => {
      if (res.data === 1) {
        window.location.reload();
      }
    })
    .catch((e) => {
      console.error(e);
    })
  }

  const getBannerList = () => {
    axios
    .get(`/admin/banner?page=${page}&size=10`)
    .then((res) => {
      const { data } = res;
      setBannList([...bannList, ...data.content]);
      setPage((page) => page+1);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  useEffect(() => {
    setIsFirstSearch(true);
  }, [searchword])

  useEffect(() => {
    if ((sessionStorage.getItem("id") !== "admin") && (sessionStorage.getItem("id") !== null)) {
      return navigate("/");
    } else if (sessionStorage.getItem("id") === null) {
      return navigate("/login");
    };
    
    // 검색상태가 아니고 하단의 ref를 만났을 때
    if ((inView) && (!searchState)) {
      getBannerList();
      // 검색상태이고 하단의 ref를 만났을 때
    } else if ((inView) && (searchState)) {
      searchBanner();
    }
  }, [inView]);

  return (
    <>
      <div className="BN_wrap">
        <div className="BN_header">
          <span>배너관리</span>
          <Link to="/admin/banner/write">
            <button>등록</button>
          </Link>
          <div className="BN_search">
            <input
              placeholder="업체명"
              maxLength="15px"
              onChange={(e) => {setSearchword(e.target.value)}}
              onKeyDown={(e) => {activeEnter(e)}}
              ref={searchRef}
            ></input>
            <img src={search} alt="searchicon" onClick={() => {searchBanner()}}/>
          </div>
        </div>
        <div className="BN_content">
          {bannList?.map((item, index) => (
            <div className="BN_banner" key={index}>
                <div className= {new Date(item.bann_end)<new Date()&&"BN_banner_expired" }>
              <div className="BN_banner_num">{item.bann_num}</div>
              <div className="BN_banner_img">
                  <img alt="bannerimage" src={`/images/banner/${item.bann_image}`}/>
              </div>
              <div className="BN_banner_info">
                  <div>{item.seller_name}</div>
                  <div>{item.seller_phone}</div>
              </div>
              <div className="BN_banner_date">
                <a href={item.bann_link}>{item.bann_link}</a>
                <div className="BN_banner_date_info">
                  {item.bann_start.substring(0, 10)}~{item.bann_end.substring(0, 10)}
                </div>
              </div>
              <div className="BN_banner_delete" onClick={() => {deleteHandler(item.bann_num)}}>삭제</div>
              </div>
            </div>
          ))}
        </div>
        <div ref={ref} />
      </div>
    </>
  );
};

export default AdminBanner;
