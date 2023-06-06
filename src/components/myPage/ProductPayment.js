import { Link } from "react-router-dom";
import "./ProductPayment.css";
import React, { useEffect, useState } from "react";
import member from "../../images/member.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadiconblack from "../../images/loadingiconblack.png";
import loadiconred from "../../images/loadingiconred.png";

export const ProductPayment = ({ data, getData }) => {
  const navigate = useNavigate();

  //props or location 사용
  const onClick = (board_num) => {
    navigate(`/post/detail/${board_num}`);
  };

  const pay = (board_num) => {
    navigate(`/post/pay/${board_num}`, {
      sell_type: 1,
    });
  };

  const delivery = (board_num) => {
    navigate(`/payment/detail/${board_num}`);
  };

  const canclechange = (productCode) => {
    if (window.confirm("결제 취소하시겠습니까?")) {
      axios.post("/pay/cancel",{ 
        payNum: data.pay_num,
        productCode: productCode,
      })
      .then((res) => {
        alert("결제 취소되었습니다.");
        ProductPayment()  
       })
      .catch((e) => {
        console.error(e);
      })
    }
  };

  const prodstatechange = (productCode) => {
    const requestDate = {
      member_id: sessionStorage.getItem("id"),
      product_code: productCode
    }
    axios
      .post("/user/payment/confirm", requestDate)
      .then((res) => {
        getData();
        ProductPayment() 
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="productPay">
      <div className="imagePay">
        <div className="productcodePay">
          {(data.pay_state > 2) ? (
            <>
              {data.pay_num}
            </>
          ) : (
            <>
              
            </>
          )}
        </div>
        <img
          src={`/images/prod/${data.main_image}`}
          alt="productimage"
          onClick={() => onClick(data.board_num)}
        />
      </div>
      <div className="marginzero">
        {/* {data.pay_state === 0 ? (
          <div className="redcolorPay">
            <img src={loadiconred} alt=""></img>낙찰 - 결제전
          </div>
        ) :  */}
        {data.pay_state === 1 ? (
          <div className="balckcolorPay">
            <img src={loadiconblack} alt=""></img>배송 준비중
          </div>
        ) : data.pay_state === 2 ? (
          <div className="balckcolorPay">
            <img src={loadiconblack} alt=""></img>배송 중
          </div>
        ) : data.pay_state === 3 ? (
          <div className="balckcolorPay">
            <img src={loadiconblack} alt=""></img>배송 완료
          </div>
        ) : (
          <div className="graycolorPay">구매확정</div>
        )}
        <div className="com_namePay">{data.prod_com}</div>
        <div
          className="product_namePay"
          onClick={() => onClick(data.board_num)}
        >
          {data.prod_name}
        </div>

        <div className="pricePay">
          {/* {data.pay_state === 0 ? (
            <div className="redcolormoneyPay">
              {data.prod_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>
          ) : ( */}
            <div className="blackcolormoneyPay">
              {data.prod_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>
          {/* )} */}
        </div>
        <div className="mile">
        {data.pay_state === 5 ? (
            <>
            마일리지 {(data.prod_price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 적립 완료
            </>
          ) : (
            <>
            마일리지 {(data.prod_price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 적립 예정
            </>
          )}
        </div>

        <div className="mile">
          {data.pay_state === 0 ? (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 하기"
                onClick={() => pay(data.board_num, data.sell_type)}
              ></input>
            </div>
          ) : data.pay_state === 1 && data.pay_cancel === true ? (
            <div>취소물품입니다.</div>
          ) : data.pay_state === 1 ? (
            <div>
              <div>
                <input
                  className="cancleButtonPay"
                  type="button"
                  value="결제 취소"
                  onClick={() => {canclechange(data.product_code)}}
                ></input>
                <input
                  className="inqButtonPay"
                  type="button"
                  value="배송 조회"
                  onClick={() => delivery(data.board_num)}
                  board_num={data.board_num}
                ></input>
              </div>
            </div>
          ) : data.pay_state === 2 ? (
            <div>
              <input
                className="cancleButtonPay"
                type="button"
                value="결제 상세"
                onClick={() => delivery(data.board_num)}
              ></input>
              <input
                  className="inqButtonPay"
                  type="button"
                  value="배송 조회"
                  onClick={() => delivery(data.board_num)}
                  board_num={data.board_num}
                ></input>
            </div>
          ) : data.pay_state === 3 ? (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 상세"
                onClick={() => delivery(data.board_num)}
              ></input>
              <input
                className="inqButtonPay"
                type="button"
                value="구매 확정"
                onClick={() => {prodstatechange(data.product_code)}}
              ></input>
            </div>
          ) : (
            <div>
              <input
                className="payButtonPay"
                type="button"
                value="결제 상세"
                onClick={() => delivery(data.board_num)}
              ></input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
