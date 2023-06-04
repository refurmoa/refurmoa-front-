import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const FindProduct = (props) => {
  // 데이터를 페이지 단위로 나누기 위한 변수들
  const searchProduct = props.searchProduct;
  const setProductname = props.setProductname;
  const setData = props.setData;
  const close_prod_modal = props.close_prod_modal;
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const [dataList, setDataList] = useState([]);

  const setProductInfo = (item) => {
    console.log(item);
    const product = item;
    setProductname(product.prodName);
    setData(product);
    
    close_prod_modal();
  };
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };
  const setList = () => { 
    axios
      .get(` /post/prod-search?search=${searchProduct}&page=${currentPage}&size=10`)
      .then((res) => {
        console.log(res.data.content);
        setDataList(res.data.content);
        setTotalPage(res.data.totalPages);
      })
      .catch((e) => {
       
      })
  }
  useEffect(() => {
    setList();
  }, [currentPage])
  const setCateDetail = (data) => {
      switch(data){
        case "appkitchen":return"주방"
        case "applife":return"생활"
        case "appelec":return"전자기기"
        case "furliving":return"거실/주방"
        case "furbed":return"침실"
        case "furoffice":return"사무실"
        default: break;
      }
    
  }
  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };
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
              {dataList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`/images/prod/${item.mainImage}`} className="FP_main_img" />
                    </td>
                    <td>{item.prodCom}</td>
                    <td>{item.prodName}</td>
                    <td>{item.prodGrade}</td>
                    <td>{setCateDetail(item.category)}</td>
                    <td>{item.productCode}</td>
                    <td>{addComma(item.orgPrice)}</td>
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
    </>
  );
};

export default FindProduct;