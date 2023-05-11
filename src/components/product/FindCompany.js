import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { companyList } from "./companyData";

const FindCompany = (props) => {
  // 데이터를 페이지 단위로 나누기 위한 변수들
  const searchCompany = props.searchCompany;
  const setSearchCompany = props.setSearchCompany;
  const setProd_com = props.setProd_com;
  const close_modal = props.close_modal;
  const [dataList, setDataList] = useState([]);

  const setCompanyInfo = (item) => {
    const name = item.com_name;
    const num = item.com_num;

    setSearchCompany(name);
    setProd_com(num);
    close_modal();
  };

  useEffect(() => {
    setDataList(companyList);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companyList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(companyList.length / itemsPerPage); i++) {
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
        <div className="PW_company_header">제휴 회사 정보</div>
        <div>
          <table className="PW_company_table">
            <thead>
              <tr>
                <th>번호</th>
                <th>회사명</th>
                <th>회사 연락처</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.com_num}</td>
                    <td>{item.com_name}</td>
                    <td>{item.com_phone}</td>
                    <td>
                      <button
                        className="PW_company_choice"
                        onClick={() => setCompanyInfo(item)}
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
                currentPage === Math.ceil(companyList.length / itemsPerPage)
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

export default FindCompany;
