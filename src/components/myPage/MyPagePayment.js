import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductPayment } from "./ProductPayment";
import MemberInfo from "./MemberInfo";
import axios from "axios";

const MyPage_detail = () => {
  const searchRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [payData, setPayData] = useState();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageBeforeHandler = () => {
    setCurrentPage(currentPage - 1)
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
  const pageNextHandler = () => {
    setCurrentPage(currentPage + 1)
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }


  const startDateHandler = () => {
    if (endDateRef.current.value !== "") {
      if (startDateRef.current.value > endDateRef.current.value) {
        alert("시작날짜가 종료날짜보다 클 수 없습니다.");
        startDateRef.current.value = "";
        startDateRef.current.focus();
      }
    }
  }

  const endDateHandler = () => {
    // 기간검색할 때 검색어 초기화
    searchRef.current.value = "";

    if (startDateRef.current.value === "") {
      startDateRef.current.focus();
      return false;
    } else if (startDateRef.current.value > endDateRef.current.value) {
      alert("시작날짜가 종료날짜보다 클 수 없습니다.");
      startDateRef.current.value = "";
      startDateRef.current.focus();
      return false;
    }

    // 페이지 초기화
    setCurrentPage(1);

    const requestData = {
      member_id: sessionStorage.getItem("id"),
      date_start: startDateRef.current.value,
      date_end: endDateRef.current.value,
      page: 0,
      size: 10
    }
    axios
      .post("/mypage/payment/period", requestData)
      .then((res) => {
        const { data } = res;
        setPayData(data.content);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      searchHandler();
    }
  }
  const searchHandler = () => {
    // 검색어 검색시 기간검색 초기화
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    
    if ( searchRef.current.value === "" || searchRef.current.value === undefined ) {
      return false;
    }

    const requestData = { 
      member_id: sessionStorage.getItem("id"),
      search: searchRef.current.value,
      page: 0,
      size: 10
    }

    // 페이지 초기화
    setCurrentPage(1);

    axios.post("/user/payment/search", requestData)
    .then((res) => {
      const { data } = res;
      setPayData(data.content);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  const getpayData = () => {
    const requestData = { 
      member_id: sessionStorage.getItem("id"),
      page: 0,
      size: 10
    }
    axios.post("/user/payment", requestData)
    .then((res) => {
      const { data } = res;
      setPayData(data.content);
      setTotalPage(data.totalPages);
    })
  }

  useEffect(() => {
    getpayData();
  }, [])

  return (
    <div>
      <MemberInfo />
      <div className="mid">
        <div className="payword">결제 내역</div>
        <input
          className="date"
          type="date"
          ref={startDateRef}
          onChange={() => startDateHandler()}
        ></input>
        ~
        <input
          className="date"
          type="date"
          ref={endDateRef}
          onChange={() => endDateHandler()}
        ></input>
        <span>
          <span className="searchboxpay">
            <input type="text" ref={searchRef} onKeyDown={(e) => {activeEnter(e)}} />
          </span>
          <input
            className="searchboxbutton"
            type="button"
            value=""
            onClick={() => {searchHandler()}}
          ></input>
        </span>
      </div>

      <main className="flex_wrap">
        {payData?.map((item, index) => {
          return <ProductPayment data={item} key={index} getData={getpayData} stp={setTotalPage} />;
        })}
      </main>
      {/* 페이지 출력 */}
      {totalPage > 1 && (
        <div className="PI-pagemp">
          {currentPage === 1 ? (
            <span className="PI-page_prev_graymp">&lt;</span>
          ) : (
            <span
              className="PI-page_prevmp"
              onClick={() => pageBeforeHandler()}
            >
              &lt;
            </span>
          )}
          <span className="PI-page_nowmp">{currentPage}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="PI-page_totalmp">{totalPage}</span>
          {currentPage === totalPage ? (
            <span className="PI-page_next_graymp">&gt;</span>
          ) : (
            <span
              className="PI-page_nextmp"
              onClick={() => pageNextHandler()}
            >
              &gt;
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default MyPage_detail;
