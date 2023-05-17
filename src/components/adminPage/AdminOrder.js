// 관리자 페이지 - 주문/배송 관리

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import search_icon from "../../images/search.png";
import orderList from "./AdminOrder.json";
import axios from "axios";

function AdminOrder() {
  const [orderlist, setOrderlist] = useState(orderList); // 주문 리스트
  const [page, setPage] = useState(1); // 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

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
  const searchUser = () => {
    // setOrderlist();
  };

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
    <AdminUserWrap>
      <TitleWrap>
        <span>주문/배송</span>
        <input type="text" id="search" name="search" maxLength="20" />
        <img alt="검색 아이콘" src={search_icon} onClick={searchUser} />
      </TitleWrap>
      <TableWrap>
        <TableTitleWrap>
          <TableTitle width={198}>주문번호</TableTitle>
          <TableTitle width={168}>상품코드</TableTitle>
          <TableTitle width={148}>수령인</TableTitle>
          <TableTitle width={213}>연락처</TableTitle>
          <TableTitle width={223}>송장번호</TableTitle>
          <TableTitle width={153}>주문상태</TableTitle>
          <TableTitle width={243} right>
            결제일
          </TableTitle>
        </TableTitleWrap>
        {orderlist.map((order, index) => (
          <Partner key={index}>
            <Link
              to={{
                pathname: "admin/order/detail",
                state: { COM_NUM: order.COM_NUM },
              }}
            >
              <PartnerInfo width={198}>{order.PAY_NUM}</PartnerInfo>
              <PartnerInfo width={168}>{order.PRODUCT_CODE}</PartnerInfo>
              <PartnerInfo width={148}>{order.RECIPT_NAME}</PartnerInfo>
              <PartnerInfo width={213}>{order.RECIPT_PHONE}</PartnerInfo>
              <PartnerInfo width={223}>{order.DELI_NUM}</PartnerInfo>
              {/* <PartnerInfo width={153}>{order.order_state}</PartnerInfo> */}

              {order.order_state === "상품 준비중" ? (
                <>
                  <PartnerInfo width={153} color="red">
                    {order.order_state}
                  </PartnerInfo>
                </>
              ) : (
                <PartnerInfo width={153}>{order.order_state} </PartnerInfo>
              )}

              <PartnerInfo width={243} right>
                {order.PAY_DATE}
              </PartnerInfo>
            </Link>
          </Partner>
        ))}
      </TableWrap>
    </AdminUserWrap>
  );
}

export default AdminOrder;

const AdminUserWrap = styled.div`
  width: 1200px;
  margin: 40px auto 0;
`;

const TitleWrap = styled.div`
  position: relative;
  width: 945px;
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
  width: 1005px;
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
  width: ${(props) => props.width}px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: ${(props) => (props.align ? "left" : "center")};
  border-right: ${(props) =>
    props.right ? "0" : "2px solid rgba(185, 168, 154, 0.5)"};

  overflow: hidden;
  color: ${(props) => props.color};
`;
