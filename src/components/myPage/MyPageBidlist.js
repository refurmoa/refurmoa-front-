import member from "../../images/member.png";
import card from "../../images/card.png";
import list from "../../images/list.png";
import star from "../../images/star.png";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "../shared/prod.json";
import { ProductBidlist } from "./ProductBidlist";
import axios from "axios";

const MyPage_detail = () => {
  const [prodData, setProdData] = useState();

  // const postProdData = () => {
  //   axios
  //     .get(`/api/post/buyprod`)
  //     .then((res) => {
  //       const { data } = res;
  //       setProdData(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  //   const data = prod.prodlist;
  //   setProdData(data);
  // };

  const day1Ref = useRef();
  const day2Ref = useRef();
  const searchRef = useRef();

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

  return (
    <div>
      <top className="top">
        <member className="membertop">
          <div className="membertext">{prodData}</div>
          {/* {prodData >= 10 ? (
            <div className="membertext">BRONZE</div>
          ) : prodData >= 30 ? (
            <div className="membertext">SILVER</div>
          ) : prodData >= 60 ? (
            <div className="membertext">GOLD</div>
          ) : prodData >= 100 ? (
            <div className="membertext">VIP</div>
          ) : (
            <div>BABY</div>
          )} */}

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
        <div className="payword">입찰 내역</div>
        <radio className="radio">
          <input type="radio" name="month"></input>
          <label>전체</label>

          <input type="radio" name="month"></input>
          <label>진행중</label>

          <input type="radio" name="month"></input>
          <label>종료</label>
        </radio>
        <select className="option">
          <option value="3">3개월</option>
          <option value="6">6개월</option>
          <option value="12">12개월</option>
        </select>
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

      <div className="flex_wrap">
        {prod.prodlist.map((product) => {
          return <ProductBidlist product={product} />;
        })}
      </div>
    </div>
  );
};
export default MyPage_detail;
