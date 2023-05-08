import { Link } from "react-router-dom";
import "./ProductBidlist.css";
import React, { useEffect, useState } from "react";

export const ProductBidlist = ({ product }) => {
  const today = new Date().getTime();
  const dday = new Date(product.end_date).getTime();
  const gapday = dday - today;
  const day = parseInt(gapday / (1000 * 60 * 60 * 24));
  const hour = Math.floor((gapday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((gapday % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((gapday % (1000 * 60)) / 1000);

  return (
    <div className="productBid">
      <image className="imageBid">
        <Link to="#">
          <img src={`/images/prod/${product.main_image}`} alt="productimage" />
        </Link>
      </image>
      <information className="inmargin">
        {day <= 0 && hour < 0 ? (
          <div className="balckcolorBid">경매 종료</div>
        ) : day <= 0 && hour <= 5 ? (
          <div className="redcolorBid">
            <div className="clockiconred"></div>
            {day}일 {hour}시간 {min}분 {sec}초
          </div>
        ) : (
          <div className="blackcolorBid">
            <div className="clockiconblack"></div>
            {day}일 {hour}시간 {min}분 {sec}초
          </div>
        )}
        <div className="com_nameBid">{product.prod_com}</div>
        <div className="product_nameBid">{product.prod_name}</div>
        <div className="bidselectBid">
          {product.bid_count > 0
            ? "경매참여자 : " + product.bid_count + "명"
            : product.bid_count === 0
            ? "경매참여자: 0 명"
            : "경매참여자 : 0 명"}
        </div>
        <price className="priceBid">
          <div>
            <span className="priceBidword">나의 입찰가</span>
            <span className="priceBidnum"> {product.cur_price}원</span>
          </div>
          <div>
            <span className="priceBidword">현재가</span>
            <span className="priceBidnum"> {product.cur_price}원</span>
          </div>
        </price>
      </information>
    </div>
  );
};
