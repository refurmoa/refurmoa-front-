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

  const [totalPageBid, setTotalPageBid] = useState(1);
  const [currentPageBid, setCurrentPageBid] = useState(1);

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
    if (startDateRef.current.value === "") {
      startDateRef.current.focus();
      return false;
    } else if (startDateRef.current.value > endDateRef.current.value) {
      alert("시작날짜가 종료날짜보다 클 수 없습니다.");
      startDateRef.current.value = "";
      startDateRef.current.focus();
      return false;
    }

    const requestData = {
      member_id: sessionStorage.getItem("id"),
      date_start: startDateRef.current.value,
      date_end: endDateRef.current.value,
      page: 0,
      size: 16
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
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      window.location.reload();
    }

    const requestData = { 
      member_id: sessionStorage.getItem("id"),
      search: searchRef.current.value,
      page: 0,
      size: 16
    }

    axios.post("/user/payment/search", requestData)
    .then((res) => {
      const { data } = res;
      setPayData(data.content);
    })
    .error((e) => {
      console.error(e);
    })
  }

  const getpayData = () => {
    const requestData = { 
      member_id: sessionStorage.getItem("id"),
      page: 0,
      size: 16
    }
    console.log(requestData);
    axios.post("/user/payment", requestData)
    .then((res) => {
      const { data } = res;
      setPayData(data.content);
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
        {prod.prodlist.map((product, index) => {
          return <ProductPayment product={product} key={index} />;
        })}
      </main>
      {/* 페이지 출력 */}
      {totalPageBid > 1 && (
        <div className="PI-pagemp">
          {currentPageBid === 1 ? (
            <span className="PI-page_prev_graymp">&lt;</span>
          ) : (
            <span
              className="PI-page_prevmp"
              onClick={() => setCurrentPageBid(currentPageBid - 1)}
            >
              &lt;
            </span>
          )}
          <span className="PI-page_nowmp">{currentPageBid}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="PI-page_totalmp">{totalPageBid}</span>
          {currentPageBid === totalPageBid ? (
            <span className="PI-page_next_graymp">&gt;</span>
          ) : (
            <span
              className="PI-page_nextmp"
              onClick={() => setCurrentPageBid(currentPageBid + 1)}
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
