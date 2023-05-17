import { Link } from "react-router-dom";
import "./ProductPayment.css";
import React, { useEffect, useState } from "react";
import member from "../../images/member.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadiconblack from "../../images/loadingiconblack.png";
import loadiconred from "../../images/loadingiconred.png";

export const ProductPayment = ({ product }) => {
  const navigate = useNavigate();

  //props or location 사용
  const onClick = (board_num) => {
    navigate(`/post/detail/${board_num}`);
  };

  const pay = (board_num) => {
    navigate("/post/pay", {
      board_num: board_num,
      sell_type: 1,
    });
  };

  const delivery = (board_num) => {
    navigate(`/payment/detail/${board_num}`);
  };

  const canclechange = () => {
    // axios
    //   .post("/updatebidcancle", {})
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  const prodstatechange = () => {
    // axios
    //   .post("/updateprodstate", {})
    //   .catch((e) => {
    //     console.error(e);
    //   });
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
          onClick={() => onClick(product.board_num)}
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
            <img src={loadiconred} alt=""></img>낙찰 - 결제전
          </div>
        ) : product.prod_state === 3 ? (
          <div className="balckcolorPay">
            <img src={loadiconblack} alt=""></img>배송 준비중
          </div>
        ) : product.prod_state === 4 ? (
          <div className="balckcolorPay">
            <img src={loadiconblack} alt=""></img>배송 완료
          </div>
        ) : (
          <div className="graycolorPay">구매확정</div>
        )}
        <div className="com_namePay">{product.prod_com}</div>
        <div
          className="product_namePay"
          onClick={() => onClick(product.board_num)}
        >
          {product.prod_name}
        </div>

        <price className="pricePay">
          {product.prod_state === 2 ? (
            <div className="redcolormoneyPay">
              {product.prod_price.toLocaleString("ko-KR")}원
            </div>
          ) : (
            <div className="blackcolormoneyPay">
              {product.prod_price.toLocaleString("ko-KR")}원
            </div>
          )}
        </price>
        <div className="mile">
          마일리지 {(product.prod_price / 100).toLocaleString("ko-KR")}원 적립
          예정
        </div>

        <paybutton className="mile">
          {product.prod_state === 1 ? (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 하기"
                onClick={() => pay(product.board_num, product.sell_type)}
              ></input>
              <productpay product_code={product.product_code}></productpay>
            </div>
          ) : product.prod_state === 2 && product.pay_cancle === 1 ? (
            <div>취소물품입니다.</div>
          ) : product.prod_state === 2 ? (
            <div>
              <div>
                <input
                  className="cancleButtonPay"
                  type="button"
                  value="결제 취소"
                  onClick={canclechange}
                ></input>
                <input
                  className="inqButtonPay"
                  type="button"
                  value="배송 조회"
                  onClick={() => delivery(product.board_num)}
                  board_num={product.board_num}
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
                onClick={() => delivery(product.board_num)}
              ></input>
              <productdetail
                product_code={product.product_code}
              ></productdetail>
              <input
                className="inqButtonPay"
                type="button"
                value="구매 확정"
                onClick={prodstatechange}
              ></input>
            </div>
          ) : (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 상세"
                onClick={() => delivery(product.board_num)}
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
