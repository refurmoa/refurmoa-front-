import { Link } from "react-router-dom";
import "./ProductBidlist.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductBidlist = ({ product }) => {
  const today = new Date().getTime();
  const dday = new Date(product.end_date).getTime();
  const gapday = dday - today;
  const day = parseInt(gapday / (1000 * 60 * 60 * 24));
  const hour = Math.floor((gapday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((gapday % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((gapday % (1000 * 60)) / 1000);

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
          product_code={product.product_code}
        />
      </image>
      <information className="inmargin">
        {day <= 0 && hour < 0 ? (
          <div className="balckcolorBid">
            <div className="clockiconblack"></div>경매 종료
          </div>
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
              <div className="priceBidnum"> {product.bid_price}원</div>
              <div className="priceBidnum"> {product.cur_price}원</div>
            </div>
          </div>
        </price>
      </information>
    </div>
  );
};
