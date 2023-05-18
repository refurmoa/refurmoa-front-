// 관리자 페이지 - 주문/배송

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import search_icon from "../../../images/search.png";
import orderList from "./AdminOrder.json";
import axios from "axios";

function AdminOrder() {
  const navigate = useNavigate();
  const [orderlist, setOrderlist] = useState(orderList); // 주문 리스트
  const [searchData, setSearchData] = useState(""); // 검색어
  const [inputNum, setInputNum] = useState(); // 송장번호 입력 폼 열기
  const [delinums, setDelinums] = useState([{}]); // 송장번호 입력 폼 내용
  const [page, setPage] = useState(1); // 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 주문 상태
  const state = [
    { id: 0,  name: "결제 전" },
    { id: 1,  name: "상품 준비중" },
    { id: 2,  name: "배송 중" },
    { id: 3,  name: "배송 완료" }
  ]

  useEffect(() => {
    // 주문 리스트 조회
    // orderListup();

    // 무한 스크롤
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; // 스크롤 이벤트 제거
  }, []);

  // 주문 리스트 조회
  const orderListup = () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // axios
      // setOrderlist();
      // setPage((prevPage) => prevPage + 1);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  // 주문 검색
  const searchOrder = () => {
    // setOrderlist();
    // searchData axios
  };

  // 송장 번호 입력
  const inputChange = (pay_num, event) => {
    const newInputs = { ...delinums, [pay_num]: event.target.value };
    setDelinums(newInputs);
  }

  // 송장 번호 등록
  const delinumInput = (pay_num) => {
    const newOrderlist = orderlist.map((order) => {
      if (order.pay_num === pay_num) {
        const p_num = order.pay_num;
        const d_num = delinums[pay_num];
        console.log(p_num);
        console.log(d_num);
  
        // axios : p_num, d_num 보내기
  
        return { ...order, deli_num: d_num };
      }
      return order;
    });
    setOrderlist(newOrderlist);
  }

  // 페이지가 변경될 때마다 데이터 요청
  useEffect(() => {
    orderListup();
  }, [page]);

  // 스크롤 감지
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading
    )
      orderListup();
  };


  return (
    <AdminOrderWrap>
      <TitleWrap>
        <span>주문/배송</span>
        <input type="text" id="search" name="search" maxLength="20"
          value={searchData} onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') searchOrder();}} />
        <img alt="검색 아이콘" src={search_icon} onClick={() => {searchOrder()}} />
      </TitleWrap>
      <TableWrap>
        <TableTitleWrap>
          <TableTitle width={198}>주문번호</TableTitle>
          <TableTitle width={168}>상품코드</TableTitle>
          <TableTitle width={148}>수령인</TableTitle>
          <TableTitle width={213}>연락처</TableTitle>
          <TableTitle width={223}>송장번호</TableTitle>
          <TableTitle width={153}>주문상태</TableTitle>
          <TableTitle width={245} right>결제일</TableTitle>
        </TableTitleWrap>
        {orderlist.map((order, index) => (
          <Partner key={index}>
              { order.pay_num === null ? <PartnerInfo width={148}>-</PartnerInfo>
                : <PartnerInfo width={148} pointer onClick={() => {navigate(`/payment/detail/${order.board_num}`);}}>
                  {order.pay_date.replaceAll(/[-: ]/g, "").substring(2, 8) + order.pay_num}
                </PartnerInfo>
              }
              <PartnerInfo width={118}>{order.product_code}</PartnerInfo>
              <PartnerInfo width={98}>{order.recipt_name}</PartnerInfo>
              <PartnerInfo width={163}>{order.recipt_phone}</PartnerInfo>
              {order.deli_num !== null ? <PartnerInfo width={173}>{order.deli_num}</PartnerInfo>
                : (
                  inputNum !== index ? <PartnerInfo width={173} line pointer onClick={() => {setInputNum(index)}}>입력</PartnerInfo>
                  : inputNum === index &&
                  <DeliNumForm type="text" id="delinum" name="delinum" maxlength="20" value={delinums[order.pay_num] || ''} required
                    onChange={(event) => inputChange(order.pay_num, event)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter')
                        delinumInput(order.pay_num);
                    }}
                  />
                )
              }
              <PartnerInfo width={103} red={order.state}>{state.find((item) => item.id === order.state).name}</PartnerInfo>
              <PartnerInfo width={195} right>{order.pay_date}</PartnerInfo>
          </Partner>
        ))}
      </TableWrap>
    </AdminOrderWrap>
  );
}

export default AdminOrder;

const AdminOrderWrap = styled.div`
  width: 1360px;
  margin: 40px auto 0;
`;

const TitleWrap = styled.div`
  position: relative;
  width: 1330px;
  padding: 0 15px;
  margin: 0 auto 30px;

  span {
    height: 35px;
    font-weight: bold;
    font-size: 25px;
    line-height: 35px;
    color: #514438;
  }

  input {
    float: right;
    width: 433px;
    height: 33px;
    border: 1px solid #b9a89a;
    border-radius: 30px;
    font-size: 18px;
    line-height: 35px;
    padding: 0 50px 0 15px;
  }

  img {
    position: absolute;
    top: 7.5px;
    right: 30px;
    width: 20px;
    height: 20px;
  }
`;

const TableWrap = styled.span`
  width: 1360px;
  margin: 0 auto;
`;

const TableTitleWrap = styled.div`
  width: 1360px;
  height: 55px;
  background-color: rgba(185, 168, 154, 0.2);
  margin-bottom: 20px;
`;

const TableTitle = styled.span`
  float: left;
  width: ${(props) => props.width}px;
  height: 30px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  border-right: ${(props) => (props.right ? "0" : "2px solid #B9A89A")};
  margin-top: 12.5px;
`;

const Partner = styled.div`
  width: 1360px;
  height: 30px;
  margin-bottom: 25px;
`;

const PartnerInfo = styled.span`
  float: left;
  width: ${props => props.width}px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  text-decoration: ${props => props.line && 'underline'};
  color: ${props => props.red === 0 && 'red'};
  border-right: ${props => props.right ? '0' : '2px solid rgba(185, 168, 154, 0.5)'};
  padding: 0 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: ${props => props.pointer && 'pointer'};
`;

const DeliNumForm = styled.input`
  float: left;
  width: 173px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  border-width: 0 2px 0 0;
  border-style: solid;
  border-color: rgba(185, 168, 154, 0.5);
  padding: 0 25px;

  &:focus {
    outline: none;
  }
`;