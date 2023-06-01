// 관리자 페이지 - 제휴회사 관리

import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import search_icon from "../../../images/search.png";
import partnerList from "./AdminPartner.json";
import axios from "axios";
import { useInView } from "react-intersection-observer";

function AdminPartner() {
  const [partnerlist, setPartnerlist] = useState(partnerList); // 제휴회사 리스트
  const [searchData, setSearchData] = useState(""); // 검색어

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [dataList, setDataList] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
 // 무한스크롤

 const [ref, inView] = useInView(); // 하단의 ref가 화면에 보여지면 inView 값이 true로 바뀜
 const [page, setPage] = useState(0); // 페이지
 const searchRef = useRef();


  const getPartnerList = () => {
    axios
    .get(`/admin/partner?search=${searchData}&page=${page}&size=30`)
    .then((res) => {
      const { data } = res;
      setDataList([...dataList, ...data.content]);
      setPage((page) => page+1);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  // 회시 검색
  const searchPartner = () => {
    try {
      axios
    .get(`/admin/partner?search=${searchData}&page=0&size=30`)
    .then((res) => {
      const { data } = res;
      setDataList([...data.content]);
      setPage(1);
      setIsFirstSearch(false);
    })
    .catch((e) => {
      console.error(e);
    });
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지가 변경될 때마다 데이터 요청
  useEffect(() => {
    
    // 검색상태가 아니고 하단의 ref를 만났을 때
    if ((inView) ) {
      getPartnerList();
      // 검색상태이고 하단의 ref를 만났을 때
    } 
  }, [inView,searchData]);

  
  return (
    <AdminPartnerWrap>
      <TitleWrap>
        <span>제휴회사 관리</span>
        <input type="text" id="search" name="search" maxLength="20"
          value={searchData} onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') searchPartner();}} />
        <img alt="검색 아이콘" src={search_icon} onClick={() => {searchPartner()}} />
      </TitleWrap>
      <TableWrap>
        <TableTitleWrap>
          <TableTitle width={88}>상태</TableTitle>
          <TableTitle width={438}>회사명</TableTitle>
          <TableTitle width={148}>대표명</TableTitle>
          <TableTitle width={213}>연락처</TableTitle>
          <TableTitle width={108} right>제품수</TableTitle>
        </TableTitleWrap>
        {dataList.map((partner) => (
          <Partner key={partner.com_num}>
            <Link to={`/admin/partner/detail`} state={{ partner: partner }}>
              <PartnerInfo width={38} color={partner.com_status} left>
                {partner.com_status === 0 ? "신청" : partner.com_status === 1 ? "제휴" : "종료"}
              </PartnerInfo>
              <PartnerInfo width={388} align="left" color={partner.com_status}>{partner.com_name}</PartnerInfo>
              <PartnerInfo width={98} color={partner.com_status}>{partner.com_ceo_name}</PartnerInfo>
              <PartnerInfo width={163} color={partner.com_status}>{partner.com_phone}</PartnerInfo>
              <PartnerInfo width={58} right align="right" color={partner.com_status}>{partner.prod_cnt.toLocaleString('ko-KR')}개</PartnerInfo>
            </Link>
          </Partner>
        ))}
        <div ref={ref} />
      </TableWrap>
      
    </AdminPartnerWrap>
  );
}

export default AdminPartner;

const AdminPartnerWrap = styled.div`
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
  width: 1005px;
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
  width: 1005px;
  height: 30px;
  margin-bottom: 25px;
`;

const PartnerInfo = styled.span`
  float: left;
  width: ${props => props.width}px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: ${props => props.align || 'center'};
  border-right: ${props => props.right ? '0' : '2px solid rgba(185, 168, 154, 0.5)'};
  color: ${props => props.color === 0 && props.left ? 'red' : props.color === 2 ? '#999999' : 'black'};
  padding: 0 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
