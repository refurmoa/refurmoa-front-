import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductPayment } from "./ProductPayment";
import MemberInfo from "./MemberInfo";

const MyPage_detail = () => {
  const [prodData, setProdData] = useState();

  // const name = window.sessionStorage.getItem("name");
  // const id = window.sessionStorage.getItem("id");

  const postProdData = () => {
    // axios.get(`/api/post/productinfo`)
    // .then((res) => {
    //   const { data } = res;
    //   setProdData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    const data = prod.prodlist;
    setProdData(data);
  };

  //  useEffect(() => {
  //   axios
  //   .all([axios("/api/countpay"), axios("/api/countbid"), axios("api/countlike")])
  //   .then(
  //     axios.spread((res1, res2, res3) => {
  //       console.log(res1, res2, res3);
  //     })
  //   )
  //   .catch((err) => console.log(err));
  //  },[]);

  const day1Ref = useRef();
  const day2Ref = useRef();
  const searchRef = useRef();

  const [totalPageBid, setTotalPageBid] = useState(1);
  const [currentPageBid, setCurrentPageBid] = useState(1);

  useEffect(() => {
    // 입찰 리스트 조회
    // setListBid();

    // 상품 개수 조회
    pageCountBid();
  }, []);

  // 상품 목록 조회
  const setListBid = () => {
    // setInquiryList();
  };

  // 상품 전체 수 조회
  const pageCountBid = () => {
    setTotalPageBid(7);
  };

  const search_date = () => {
    if (day1Ref.current.value === "" || day1Ref.current.value === undefined) {
      alert("시작 날짜를 정해주세요!!");
      day1Ref.current.focus();
      return false;
    }
    if (day2Ref.current.value === "" || day2Ref.current.value === undefined) {
      alert("끝 날짜를 정해주세요!!");
      day2Ref.current.focus();
      return false;
    }
    if (day1Ref.current.value > day2Ref.current.value) {
      alert("날짜를 다시 설정해주세요!!!");
      return false;
    }
    // axios
    //   .post("/api/post/searchdate", {
    //     day1: day1Ref.current.value,
    //     day2: day2Ref.current.value,
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_product = () => {
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      alert("내용을 입력해주세요!!");
      searchRef.current.focus();
      return false;
    }

    // axios
    //   .post("/api/post/seachtext", {
    //     id: searchRef.current.value,
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  return (
    <div>
      <MemberInfo />
      <mid className="mid">
        <div className="payword">결제 내역</div>
        <input className="date" type="date" ref={day1Ref}></input>~
        <input className="date" type="date" ref={day2Ref}></input>
        <input
          className="datesearchbutton"
          type="button"
          value=""
          onClick={search_date}
        ></input>
        <span>
          <input className="searchboxpay" type="text" ref={searchRef}></input>
          <input
            className="searchboxbutton"
            type="button"
            value=""
            onClick={search_product}
          ></input>
        </span>
      </mid>

      <main className="flex_wrap">
        {prod.prodlist.map((product) => {
          return <ProductPayment product={product} />;
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
