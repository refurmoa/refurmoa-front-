import { Link } from "react-router-dom";
import "./ProductPayment.css";
import React, { useEffect, useState } from "react";
import member from "../../images/member.png";
import { useNavigate } from "react-router-dom";

export const ProductPayment = ({ product }) => {
  const navigate = useNavigate();

  //props or location 사용
  const onClick = (product_code) => {
    navigate(`/post/detail/${product_code}`, {
      state: { product_code: product_code },
    });
  };

  const pay = () => {
    navigate("/post/pay", { state: { product_code: product.product_code } });
  };

  const delivery = () => {
    navigate("/payment/detail", {
      state: { product_code: product.product_code },
    });
  };

  return (
    <div className="productPay">
      <image className="imagePay">
        <div className="productcodePay">
          {product.pay_date}
          {product.product_code}
        </div>
        <img
          src={`/images/prod/${product.main_image}`}
          alt="productimage"
          onClick={onClick}
        />
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
        <div className="product_namePay" onClick={onClick}>
          {product.prod_name}
        </div>

        <price className="pricePay">
          {product.prod_state === 2 ? (
            <div className="redcolormoneyPay">{product.prod_price}원</div>
          ) : (
            <div className="blackcolormoneyPay">{product.prod_price}원</div>
          )}
        </price>
        <div className="mile">
          마일리지 {product.cur_price / 100}원 적립 예정
        </div>

        <paybutton className="mile">
          {product.prod_state === 1 ? (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 하기"
                onClick={pay}
              ></input>
              <productpay product_code={product.product_code}></productpay>
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
                  onClick={delivery}
                  product_code={product.product_code}
                ></input>
                <productdetail
                  product_code={product.product_code}
                ></productdetail>
              </div>
            </div>
          ) : product.prod_state === 3 ? (
            <div>
              <input
                className="cancleButtonPay"
                type="button"
                value="결제 상세"
                onClick={delivery}
              ></input>
              <productdetail
                product_code={product.product_code}
              ></productdetail>
              <input
                className="inqButtonPay"
                type="button"
                value="구매 확정"
              ></input>
            </div>
          ) : (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 상세"
                onClick={delivery}
              ></input>
              <productdetail
                product_code={product.product_code}
              ></productdetail>
            </div>
          )}
        </paybutton>
      </information>
    </div>
  );
};
