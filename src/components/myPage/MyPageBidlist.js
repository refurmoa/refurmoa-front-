import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductBidlist } from "./ProductBidlist";
import MemberInfo from "./MemberInfo";
import axios from "axios";

const MyPage_detail = () => {
  const [prodbidlistData, setProdData] = useState(prod.prodlist);

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

  // const name = window.sessionStorage.getItem("name");
  // const id = window.sessionStorage.getItem("id");

  // const postbidlistData = () => {
  //   axios
  //     .get("/mypage/bidlist/list", {
  //       id: id,
  //     })
  //     .then((res) => {
  //       const { data } = res;
  //       setProdData(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  //   const data = prod.prodlist;
  //   setProdbidlistData(data);
  // };

  const searchRef = useRef();

  const search_product = (e) => {
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      alert("내용을 입력해주세요!!");
      searchRef.current.focus();
      return false;
    }
    // axios
    //   .post(`/admin/user/detail/search`{
    //    search : e.target.value
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setProdData(data);
  };

  const search_all = () => {
    setProdData(prod.prodlist);
  };

  const search_ing = () => {
    setProdData(
      prod.prodlist.filter((li) => new Date(li.end_date) > new Date())
    );
  };

  const search_done = () => {
    setProdData(
      prod.prodlist.filter((li) => new Date(li.end_date) <= new Date())
    );
  };

  const searchMonth = (e) => {
    setProdData(
      prod.prodlist.filter(
        (li) =>
          new Date(li.start_date).getTime() >=
          new Date().getTime() - e.target.value * 30 * 24 * 60 * 60 * 1000
      )
    );
  };

  console.log(prodbidlistData);

  return (
    <div>
      <MemberInfo />
      <mid className="mid">
        <div className="payword">입찰 내역</div>
        <radio className="radio">
          <input type="radio" name="month" onClick={search_all}></input>
          <label>전체</label>

          <input type="radio" name="month" onClick={search_ing}></input>
          <label>진행중</label>

          <input type="radio" name="month" onClick={search_done}></input>
          <label>종료</label>
        </radio>
        <select className="option" onChange={(e) => searchMonth(e)}>
          <option value="48">개월 수</option>
          <option value="3">3개월</option>
          <option value="6">6개월</option>
          <option value="12">12개월</option>
        </select>
        <span className="wordsearchpart">
          <input className="searchbox" type="text" ref={searchRef}></input>
          <input
            className="searchboxbuttonBid"
            type="button"
            value=""
            onClick={search_product}
          ></input>
        </span>
      </mid>

      <div className="flex_wrap">
        {/* {prod.prodlist.map((product) => {
          return <ProductBidlist product={product} />;
        })} */}
        {prodbidlistData.map((product) => {
          return <ProductBidlist product={product} />;
        })}
        {/* <ProductBidlist product={prodbidlistData} />; */}
      </div>
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
