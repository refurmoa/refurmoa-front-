import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../product/ProductWrite.css";
import "./PostWrite.css";

function PostDirect(props) {
  const onChangeDir = props.onChangeDir;
  const addComma = props.addComma;
  const onChangeDel = props.onChangeDel;
  const setAs_date = props.setAs_date;
  const dir_price = props.dir_price;
  const del_price = props.del_price;
  const as_date = props.as_date;

  return (
    <>
      <div className="PW_product_category">
        <div className="PR_product_input_header">즉시구매가</div>
        <div className="PR_product_price">
          {" "}
          <input
            className="PR_product_price_input"
            type="text"
            onChange={(e) => onChangeDir(e)}
            value={addComma(dir_price) || ""}
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
            value={addComma(del_price) || ""}
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
        <div className="PR_product_input_header">상세정보</div>
        <div className="PR_product_file">
          <input
            type="file"
            className="PR_defect_image"
            id="input-file"
            accept="image/*"
            readonly
          />
        </div>
      </div>
    </>
  );
}
export default PostDirect;
