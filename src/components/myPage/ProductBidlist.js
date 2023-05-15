import { Link } from "react-router-dom";
import "./ProductBidlist.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductBidlist = ({ product }) => {
  const [today, setToday] = useState(new Date().getTime()); // 현재날짜(ms) 구하기
  const dday = new Date(product.end_date).getTime();
  const gapday = dday - today;
  const day = parseInt(gapday / (1000 * 60 * 60 * 24));
  const hour = Math.floor((gapday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((gapday % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((gapday % (1000 * 60)) / 1000);

  // 1초마다 리렌더링
  useEffect(() => {
    const countdown = setInterval(() => {
      setToday(new Date().getTime());
    }, 1000);
    return () => clearInterval(countdown);
  }, [today]);

  const navigate = useNavigate();

  const onClick = (product_code) => {
    navigate(`/post/detail/${product_code}`, {
      state: { product_code: product_code },
    });
  };

  return (
    <div className="productBid">
      <image className="imageBid">
        {product.prod_owner === 0 ? (
          <div className="productnownerBid">
            <div>패찰</div>
          </div>
        ) : product.prod_owner === 1 ? (
          <div className="productownerBid">
            <div className="productownerboxBid"></div>
            <span className="productownertextBid">낙찰</span>
          </div>
        ) : (
          ""
        )}
        <img
          src={`/images/prod/${product.main_image}`}
          alt="productimage"
          onClick={onClick}
        />
      </image>
      <information className="inmargin">
        {day <= 0 && hour < 0 ? (
          <div className="balckcolorBid">
            <img src="../../images/time_icon_red.png" alt=""></img>
            <div className="clockiconblack"></div>경매 종료
          </div>
        ) : day === 0 && hour < 12 ? (
          <div className="redcolorBid">
            <img src="../../images/time_icon_red.png" alt=""></img>{" "}
            <div className="clockiconred"></div>
            {hour}시간 {min}분 {sec}초
          </div>
        ) : day === 0 && hour <= 24 ? (
          <div className="blackcolorBid">
            <img src="../../images/time_icon_red.png" alt=""></img>
            <div className="clockiconblack"></div>
            {hour}시간 {min}분 {sec}초
          </div>
        ) : (
          <div className="balckcolorBid">
            <img src="../../images/time_icon_red.png" alt=""></img>
            <div className="clockiconblack"></div>
            {day}일 {hour}시간 {min}분 {sec}초
          </div>
        )}
        <div className="com_nameBid">{product.prod_com}</div>
        <div
          className="product_nameBid"
          onClick={onClick}
          product_code={product.product_code}
        >
          {product.prod_name}
        </div>
        <div className="bidselectBid">
          {product.bid_count > 0
            ? "경매참여자 : " + product.bid_count + "명"
            : product.bid_count === 0
            ? "경매참여자: 0 명"
            : "경매참여자 : 0 명"}
        </div>
        <price className="priceBid">
          <div className="pricewrap">
            <div></div>
            <div>
              <div className="priceBidword">나의 입찰가</div>
              <div className="priceBidword">현재가</div>
            </div>
            <div>
              <div className="priceBidnum">
                {product.bid_price.toLocaleString("ko-KR")}원
              </div>
              <div className="priceBidnum">
                {product.cur_price.toLocaleString("ko-KR")}원
              </div>
            </div>
          </div>
        </price>
      </information>
    </div>
  );
};
