import { Link } from "react-router-dom";
import "./ProductBidlist.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import redtimeicon from "../../images/time_icon_red.png";
import blacktimeicon from "../../images/time_icon_black.png";

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
        {/* bid_cancle => 0 낙찰 1 패찰 */}
        {product.bid_cancle === 1 ? (
          <div className="productnownerBid">
            <div onClick={() => onClick(product.product_code)}>패찰</div>
          </div>
        ) : product.bid_cancle === 0 ? (
          <div className="productownerBid">
            <div className="productownerboxBid"></div>
            <span
              className="productownertextBid"
              onClick={() => onClick(product.product_code)}
            >
              낙찰
            </span>
          </div>
        ) : (
          ""
        )}
        <img
          src={`/images/prod/${product.main_image}`}
          alt="productimage"
          onClick={() => onClick(product.product_code)}
        />
      </image>
      <information className="inmargin">
        {day <= 0 && hour <= 0 && min <= 0 && sec <= 0 ? (
          <div className="balckcolorBid">
            <img src={blacktimeicon} alt=""></img>경매 종료
          </div>
        ) : day === 0 && hour < 12 ? (
          <div className="redcolorBid">
            <img src={redtimeicon} alt=""></img>
            {hour}시간 {min}분 {sec}초
          </div>
        ) : day === 0 && hour <= 24 ? (
          <div className="balckcolorBidNum">
            <img src={blacktimeicon} alt=""></img>
            {hour}시간 {min}분 {sec}초
          </div>
        ) : (
          <div className="balckcolorBidNum">
            <img src={blacktimeicon} alt=""></img>
            {day}일 {hour}시간 {min}분 {sec}초
          </div>
        )}
        <div className="com_nameBid">{product.prod_com}</div>
        <div
          className="product_nameBid"
          onClick={() => onClick(product.product_code)}
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
        <price>
          {product.prod_state === 1 ? (
            <div className="priceBid">
              <div className="priceBidAll1">
                <div className="priceBidword">나의 입찰가</div>
                <div className="priceBidword">현재가</div>
              </div>
              <div className="priceBidAll2">
                <div className="priceBidnum">
                  {product.bid_price.toLocaleString("ko-KR")}원
                </div>
                <div className="priceBidnum">
                  {product.cur_price.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
          ) : product.prod_state >= 2 ? (
            <div className="priceBid">
              <div className="priceBidAll1">
                <div className="priceBidword">나의 입찰가</div>
                <div className="priceBidword">낙찰가</div>
              </div>
              <div className="priceBidAll2">
                <div className="priceBidnum">
                  {product.bid_price.toLocaleString("ko-KR")}원
                </div>
                <div className="priceBidnum">
                  {product.prod_price.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </price>
      </information>
    </div>
  );
};
