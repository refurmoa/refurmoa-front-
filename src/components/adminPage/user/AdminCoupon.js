// ID, PW 찾기 모달

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CouponList.css";
import cancel from "../../images/cancel.png";
import moment from "moment";
const CouponList = (props) => {
    const id=props.id;
    const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [couponList,setCouponList]=useState([]);//쿠폰 리스트
    const state =props.state;
    const setPay=props.setPay;
    const pay=props.pay;
  // 쿠폰 찾기
    useEffect(()=> {
        axios
        .get(`/pay/coupon?id=${props.id}&page=${currentPage-1}&size=10`)
        .then((res) => {
            if(res.data.content.length===0){
              alert("쿠폰이 존재하지 않습니다.")
              props.setModal(false);
            }else{
              setCouponList(res.data.content);
              setTotalPage(res.data.totalPages);
            }
        })
        .catch((e) => {
            console.error(e);
        });
    },[currentPage])
    //pay 정보 업데이트
    const setCouponInfo=(item)=>{
        setPay({ 
            ...pay,
            coupon_num:item.coupon_num,
            coupon_price:item.sale_price,
        }); 
        props.setModal(false);//모달 종료
    }
  return (
    <div className="Coupon_find_wrap">
      <table className="Coupon_table">
            <thead>
              <tr>
                <th>쿠폰명</th>
                <th>쿠폰 할인가</th>
                <th>쿠폰 만료일</th>
              </tr>
            </thead>

            <tbody>
              {couponList.map((item, index) => {//쿠폰 정보
                return (
                  <tr key={index} onClick={()=>{state===1&&setCouponInfo(item)}}>
                    <td>{item.coupon_name}</td>
                    <td>{item.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</td>
                    <td>{moment(item.valid_date).format("YYYY-MM-DD")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

      {/* 페이지 출력 */}
      {totalPage > 1 && (
        <div className="NL-page">
          {currentPage === 1 ? (
            <span className="NL-page_prev_gray">&lt;</span>
          ) : (
            <span
              className="NL-page_prev"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </span>
          )}
          <span className="NL-page_now">{currentPage}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="NL-page_total">{totalPage}</span>
          {currentPage === totalPage ? (
            <span className="NL-page_next_gray">&gt;</span>
          ) : (
            <span
              className="NL-page_next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </span>
          )}
        </div>
      )}
        <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.setModal(false);}} />
     </div>  
  );
};

export default CouponList;
