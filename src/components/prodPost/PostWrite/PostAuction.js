import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../product/ProductWrite.css";
import "./PostWrite.css";

function PostAuction(props) {
  const addComma = props.addComma;
  const onChangeAuc = props.onChangeAuc;
  const onChangeDel = props.onChangeDel;
  const onChangeUnit = props.onChangeUnit;
  const setAs_date = props.setAs_date;
  const setDetailFile=props.setDetailFile;
  const auc_price = props.auc_price;
  const unit_price=props.unit_price;
  const del_price = props.del_price;
  const start_date = props.start_date;
  const end_date = props.end_date;
  const as_date = props.as_date;
  const setStart_date = props.setStart_date;
  const setEnd_date = props.setEnd_date;

  const setPreviewImg = (e) => {
    var reader = new FileReader();
    setDetailFile(e.target.files[0]);
    
     // console.log("fileList=>" + fileList);
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <div className="PW_product_category">
        <div className="PR_product_input_header">경매시작가</div>
        <div className="PR_product_price">
          {" "}
          <input
            className="PR_product_price_input"
            type="text"
            onChange={(e) => onChangeAuc(e)}
            value={auc_price===0?"":addComma(auc_price) }
          />
          원
        </div>
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">입찰단위가</div>
        <div className="PR_product_price">
          {" "}
          <input
            className="PR_product_price_input"
            type="text"
            onChange={(e) => onChangeUnit(e)}
            value={unit_price===0?"":addComma(unit_price) }
          />
          원
        </div>
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">배송설치비</div>
        <div className="PR_product_price">
          {" "}
          <input
            className="PR_product_price_input"
            type="text"
            onChange={(e) => onChangeDel(e)}
            value={del_price===0?"":addComma(del_price) }
          />
          원
        </div>
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">A/S 기간</div>
        <div className="PR_product_price">
          <input
            className="PR_product_price_input"
            type="text"
            onChange={(e) => setAs_date(e.target.value)}
            value={as_date}
          />
          년
        </div>
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">경매시작일</div>
        <input
          className="PR_Auction_date"
          type="datetime-local"
          size="100"
          data-placeholder="시작일"
          value={start_date}
          onChange={(e) => setStart_date(e.target.value)}
        />
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">경매종료일</div>

        <input
          className="PR_Auction_date"
          type="datetime-local"
          size="100"
          data-placeholder="시작일"
          value={end_date}
          onChange={(e) => setEnd_date(e.target.value)}
        />
      </div>
      <div className="PW_product_category">
        <div className="PR_product_input_header">상세정보</div>

        <input
          type="file"
          className="PR_defect_image"
          id="input-file"
          accept="image/*"
          readonly
          onChange={setPreviewImg}
        />
      </div>
    </>
  );
}
export default PostAuction;
