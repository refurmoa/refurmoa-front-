import member from "../../images/member.png";
import card from "../../images/card.png";
import list from "../../images/list.png";
import star from "../../images/star.png";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductPayment } from "./ProductPayment";
import { Link } from "react-router-dom";

const MyPage_detail = () => {
  const [prodData, setProdData] = useState();

  // const name = window.sessionStorage.getItem("name");
  // const id = window.sessionStorage.getItem("id");

  const postProdData = () => {
    // axios.get(`/api/post/bidprod`)
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

  const navigate = useNavigate();

  const day1Ref = useRef();
  const day2Ref = useRef();
  const searchRef = useRef();

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
      <top className="top">
        <member className="membertop">
          {/* <div className="membertext">{prodbidlistData}</div>
          {prodbidlistData >= 10 ? (
            <div className="membertext">BRONZE</div>
          ) : prodbidlistData >= 30 ? (
            <div className="membertext">SILVER</div>
          ) : prodbidlistData >= 60 ? (
            <div className="membertext">GOLD</div>
          ) : prodbidlistData >= 100 ? (
            <div className="membertext">VIP</div>
          ) : (
            <div>BABY</div>
          )} */}
          <Link to="/mypage">
            <div className="membertext">GOLD</div>
            <img alt="" src={member} />
            <div className="membername">이모아(leemoa)</div>
            {/* <div className="membername">{name}{(id)}</div> */}
          </Link>
          <Link to="/mypage/userupdate">
            <button>개인정보 수정</button>
          </Link>
        </member>
        <line className="borderright"></line>
        <payment className="resttop">
          <div className="resttext">결제 · 배송</div>
          <div className="restnumber1">2</div>
          {/* <div className="restnumber1">{res1}</div> */}
          <img alt="" src={card} />
        </payment>
        <line className="borderright"></line>
        <bidlist className="resttop">
          <Link to="/mypage/bidlist">
            <div className="resttext">입찰 내역</div>
            <div className="restnumber2">13</div>
            {/* <div className="restnumber1">{res2}</div> */}
            <img alt="" src={list} />
          </Link>
        </bidlist>
        <line className="borderright"></line>
        <liked className="resttop">
          <Link to="/mypage">
            <div className="resttext">찜한 상품</div>
            <div className="restnumber1">4</div>
            {/* <div className="restnumber1">{res3}</div> */}
            <img alt="" src={star} />
          </Link>
        </liked>
      </top>
      <mid className="mid">
        <div className="payword">결제 내역</div>
        <input className="date" type="date" ref={day1Ref}></input>~
        <input className="date" type="date" ref={day2Ref}></input>
        <input
          className="datesearchbutton"
          type="button"
          value="검색"
          onClick={search_date}
        ></input>
        <span className="wordsearchpart">
          <input className="searchbox" type="text" ref={searchRef}></input>
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
    </div>
  );
};
export default MyPage_detail;
