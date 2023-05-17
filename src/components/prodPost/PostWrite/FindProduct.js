import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productList } from "./ProdcutList";

const FindProduct = (props) => {
  // 데이터를 페이지 단위로 나누기 위한 변수들
  const searchProduct = props.searchProduct;
  const setProductname = props.setProductname;
  const setData = props.setData;
  const close_prod_modal = props.close_prod_modal;
  const [dataList, setDataList] = useState([]);

  const setProductInfo = (item) => {
    const product = item;
    setProductname(product.prod_name);
    setData(product);
    console.log(product);
    close_prod_modal();
  };

  useEffect(() => {
    setDataList(productList);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productList.length / itemsPerPage); i++) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }

  // 조회수
  const readcountup = (e) => {};

  return (
    <>
      <div className="PW_company_div">
        <div className="PW_company_header">상품 정보</div>
        <div>
          <table className="PR_company_table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>제품 회사</th>
                <th>제품 이름</th>
                <th>제품 상태</th>
                <th>카테고리</th>
                <th>카테고리 코드</th>
                <th>원가</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.image} className="FP_main_img" />
                    </td>
                    <td>{item.prod_com}</td>
                    <td>{item.prod_name}</td>
                    <td>{item.prod_grade}</td>
                    <td>{item.category}</td>
                    <td>{item.category_code}</td>
                    <td>{item.org_price}</td>
                    <td>
                      <button
                        className="PW_company_choice"
                        onClick={() => setProductInfo(item)}
                      >
                        선택
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="company-pagination">
          <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {pageNumbers}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(productList.length / itemsPerPage)
              }
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindProduct;
