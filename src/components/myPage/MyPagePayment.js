import member from "../../images/member.png";
import card from "../../images/card.png";
import list from "../../images/list.png";
import star from "../../images/star.png";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "../prodPost/prod.json";
import { ProductPayment } from "./ProductPayment";

const MyPage_detail = () => {
  const [prodData, setProdData] = useState();

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

  const navigate = useNavigate();

  const day1Ref = useRef();
  const day2Ref = useRef();
  const searchRef = useRef();

  const search_detail = () => {
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
  };

  const prodDetailHandler = (board_num) => {
    navigate(`/post/detail/${board_num}`);
  };

  const handleMemberForm = () => {
    navigate("/userUpdate");
  };
  const bidList = () => {
    navigate("/bidlist");
  };

  return (
    <div>
      <top className="top">
        <member className="membertop">
          <div className="membertext">GOLD</div>
          <img alt="" src={member} />
          <div className="membername">이모아(leemoa)</div>
          <button>개인정보 수정</button>
        </member>
        <line className="borderright"></line>
        <payment className="resttop">
          <div className="resttext">결제 · 배송</div>
          <div className="restnumber1">2</div>
          <img alt="" src={card} />
        </payment>
        <line className="borderright"></line>
        <bidlist className="resttop">
          <div className="resttext">입찰 내역</div>
          <div className="restnumber2">13</div>
          <img alt="" src={list} />
        </bidlist>
        <line className="borderright"></line>
        <liked className="resttop">
          <div className="resttext">찜한 상품</div>
          <div className="restnumber1">4</div>
          <img alt="" src={star} />
        </liked>
      </top>
      <mid className="mid">
        <div className="payword">결제 내역</div>
        <input className="date" type="date"></input>~
        <input className="date" type="date"></input>
        <input className="datesearchbutton" type="button" value="검색"></input>
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
          return (
            <ProductPayment
              key={product.board_num}
              onClick={() => prodDetailHandler(product.board_num)}
              product={product}
            />
          );
        })}
      </main>
    </div>
  );
};
export default MyPage_detail;
