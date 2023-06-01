import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productList } from "./ProdcutList";
import axios from "axios";
import moment from "moment";
const FindProduct = (props) => {
  // 데이터를 페이지 단위로 나누기 위한 변수들
  const searchProduct = props.searchProduct;
  const setProductname = props.setProductname;
  const setData = props.setData;
  const setProductnum=props.setProductnum;
  const close_prod_modal = props.close_prod_modal;
  const [dataList, setDataList] = useState([]);
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  


  const setProductInfo = (item) => {
    setProductname(item.prodName);
    setProductnum(item.productCode)
    close_prod_modal();
  };
  const setList = () => { 
    axios
    .get(`/post/prod_search?search=${props.searchProduct}&page=${currentPage}&size=10`)
    .then((res) => {
      console.log(res.data.content);
      setDataList(setCateDetail(res.data.content));
      setTotalPage(res.data.totalPages);
      
    })
    .catch((e) => {
      console.error(e);
    });
  }
  useEffect(() => {
    setList();
  }, [])


  // 현재 페이지에 해당하는 데이터 추출



  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };
  const setCateDetail = (data) => {
    for (let i=0; i<data.length; i++) {
      switch(data[i].category){
        case "appkitchen":data[i].category="주방"
        break;
        case "applife":data[i].category="생활"
        break;
        case "appelec":data[i].category="전자기기"
        break;
        case "furliving":data[i].category="거실/주방"
        break;
        case "furnbed":data[i].category="침실"
        break;
        case "furoffice":data[i].category="사무실"
        break;
        default: break;
      }
      data[i].regDate=moment(data[i].regDate).format("YYYY-MM-DD")
    }
    return data;
  }
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
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
                      <img src={item.mainImage} className="FP_main_img" />
                    </td>
                    <td>{item.prodCom}</td>
                    <td>{item.prodName}</td>
                    <td>{item.prodGrade}</td>
                    <td>{item.category}</td>
                    <td>{item.categoryCode}</td>
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
