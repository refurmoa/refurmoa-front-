import React, { useState, useEffect } from "react";
import axios from "axios";
import cancel from "../../images/cancel.png";
const FindCompany = (props) => {
  // 데이터를 페이지 단위로 나누기 위한 변수들
  const searchCompany = props.searchCompany;
  const setSearchCompany = props.setSearchCompany;
  const setCom_num = props.setCom_num;
  const close_modal = props.close_modal;
  const [dataList, setDataList] = useState([]);
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  useEffect(() => {
    axios
    .get(`/partner/search?search=${searchCompany}&page=${currentPage}&size=10`)
    .then((res) => {
      console.log(res.data);
      const { data } = res;
      setDataList(data.content);
      setTotalPage(data.totalPages);
    })
    .catch((e) => {
      console.error(e);
    });
  }, [currentPage]);
  const setCompanyInfo = (item) => {
    const name = item.com_name;
    const num = item.com_num;
    setCom_num(num);
    setSearchCompany(name);
    close_modal();
  };

  useEffect(() => {
    setDataList(dataList);
  }, []);

  
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const readcountup = (e) => {};

  return (
    <>
      <div className="PW_company_div">
        <div className="PW_company_header">제휴 회사 정보</div>
        <div>
          <table className="PW_company_table">
            <thead>
              <tr>
                <th>회사번호</th>
                <th>제휴 회사명</th>
                <th>제휴 대표명</th>
                <th>제휴 연락처</th>
                <th>제품수</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {dataList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.com_num}</td>
                    <td>{item.com_name}</td>
                    <td>{item.com_ceo_name}</td>
                    <td>{item.com_phone}</td>
                    <td>{item.prod_cnt}</td>
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
        { totalPage > 1 &&
        <div className="PI-page">
          { currentPage === 0 ? <span className="PI-page_prev_gray">&lt;</span>
            : <span className="PI-page_prev" onClick={() => setCurrentPage(currentPage-1)}>&lt;</span>
          }
          <span className="PI-page_now">{currentPage+1}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="PI-page_total">{totalPage}</span>
          { currentPage+1 === totalPage ? <span className="PI-page_next_gray">&gt;</span>
            : <span className="PI-page_next" onClick={() => setCurrentPage(currentPage+1)}>&gt;</span>
          }
        </div>
      }
        </div>
        <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.close_modal();}} />
      </div>
    </>
  );
};

export default FindCompany;
