// ID, PW 찾기 모달

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCoupon.css"
import cancel from "../../../images/cancel.png";
import moment from "moment";
const AdminCoupon = (props) => {
    const id=props.id;
    const[coupon,setCoupon]=useState("");
    const[sale_price,setSale_price]=useState();
    const[issue_date,setIssue_date]=useState();
    const[valid_date,setValid_date]=useState();
    const addComma = (price) => {
      let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return returnString;
    };
    const Coupon_regi=()=>{
      if(coupon===""||sale_price===null||issue_date===null||valid_date===null){
        alert("모든 정보가 입력되지 않았습니다.")
        return false;
      }
      else{
        axios
        .post(`/admin/user/detail/coupon/insert`,{
            memberId:id,
            couponName:coupon,
            salePrice:sale_price,
            issueDate:issue_date,
            validDate:valid_date,
          })
        .then((res) => {
          alert("쿠폰 등록이 완료되었습니다.");
          props.setCouponModal(false);
        })
        .catch((e) => {
          alert("쿠폰 등록에 실패했습니다.")
          console.error(e);
        });
        }
    }

  return (
      <div className="Coupon_regi_wrap">
       <div className="Coupon_regi_Title" >쿠폰 등록</div>
       <div className="Coupon_regi_content">
        <div className="Coupon_name" htmlFor="name">쿠폰 이름</div>
        <input className="Coupon_name_input" name="name" maxLength={20}
        type="text" value={coupon} onChange={(e)=>setCoupon(e.target.value)} required />
      </div> 
      <div className="Coupon_regi_content">
        <div className="Coupon_name" htmlFor="name">할인 가격</div>
        <input className="Coupon_price_input" 
          name="name" type="number" value={sale_price}  onChange={(e)=>setSale_price(e.target.value)}required />
        <div className="Coupon_won">원</div>
      </div>
      <div className="Coupon_regi_content">
        <div className="Coupon_name" htmlFor="name">쿠폰 발행일</div>
        <input className="Coupon_name_input" name="name" 
        type="date" value={issue_date} onChange={(e)=>setIssue_date(e.target.value)} required />
      </div> 
      <div className="Coupon_regi_content">
        <div className="Coupon_name" htmlFor="name">쿠폰 만료일</div>
        <input className="Coupon_name_input" name="name" 
        type="date" value={valid_date} onChange={(e)=>setValid_date(e.target.value)} required />
      </div> 
      <div className="Coupon_regi_button" onClick={()=>Coupon_regi()}>등록</div>
      <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.setCouponModal(false);}} />
     </div>  
  );
};

export default AdminCoupon;
