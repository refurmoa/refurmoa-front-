import { Link } from "react-router-dom";
import "./ProductPayment.css";
import React, { useEffect, useState } from "react";
import member from "../../images/member.png";

export const ProductPayment = ({ product }) => {
  return (
    <div className="productPay">
      <image className="imagePay">
        <Link to="#">
          <div className="productcodePay">
            {product.start_date}
            {product.board_num}
          </div>
          <img src={`/images/prod/${product.main_image}`} alt="productimage" />
        </Link>
      </image>
      <information className="marginzero">
        {product.prod_state === 0 ? (
          <div className="blackcolorPay">게시전</div>
        ) : product.prod_state === 1 ? (
          <>
            <div className="balckcolorPay">게시 완료</div>
          </>
        ) : product.prod_state === 2 ? (
          <div className="redcolorPay">
            <div className="iconred"></div>낙찰 - 결제전
          </div>
        ) : product.prod_state === 3 ? (
          <div className="balckcolorPay">
            <div className="iconblack"></div>배송 준비중
          </div>
        ) : product.prod_state === 4 ? (
          <div className="graycolorPay">베송 완료</div>
        ) : (
          <div className="graycolorPay">
            <div className="iconblack"></div>구매확정
          </div>
        )}
        <div className="com_namePay">{product.prod_com}</div>
        <div className="product_namePay">{product.prod_name}</div>

        <price className="pricePay">
          {product.prod_state === 2 ? (
            <div className="redcolormoneyPay">{product.cur_price}원</div>
          ) : (
            <div className="blackcolormoneyPay">{product.cur_price}원</div>
          )}
        </price>
        <div className="mile">
          마일리지 {product.cur_price / 100}원 적립 예정
        </div>

        <paybutton className="mile">
          {product.prod_state === 1 ? (
            <div>
              <Link to="/post/pay/${board_num}">
                <input
                  className="payButtonPay"
                  type="button"
                  value="결제 하기"
                ></input>
              </Link>
            </div>
          ) : product.prod_state === 2 ? (
            <div>
              <div>
                <input
                  className="cancleButtonPay"
                  type="button"
                  value="결제 취소"
                ></input>
                <input
                  className="inqButtonPay"
                  type="button"
                  value="배송 조회"
                ></input>
              </div>
            </div>
          ) : product.prod_state === 3 ? (
            <span>
              <Link to="/payment/detail/${board_num}">
                <input
                  className="button_under2"
                  type="button"
                  value="결제 상세"
                ></input>
              </Link>
              <input
                className="button_under3"
                type="button"
                value="구매 확정"
              ></input>
            </span>
          ) : (
            <Link to="/payment/detail/${board_num}">
              <input
                className="button_under1"
                type="button"
                value="결제 상세"
              ></input>
            </Link>
          )}
        </paybutton>
      </information>
    </div>
  );
};
