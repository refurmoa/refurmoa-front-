// 관리자 페이지 - 회원 관리

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import search_icon from "../../../images/search.png";
// import userList from "./UserList.json";
import axios from "axios";
import { useInView } from "react-intersection-observer";

function AdminUser() {
  const [userlist, setUserlist] = useState([]); // 회원 리스트
  const [searchData, setSearchData] = useState(""); // 검색어
  const [page, setPage] = useState(0); // 페이지
  const [ref, inView] = useInView(); // 하단의 ref가 화면에 보여지면 inView 값이 true로 바뀜

  useEffect(() => {
    // 하단의 ref를 만났을 때
    if (inView) {
      adminuserlist();
    }
  }, [inView]);
  console.log(inView);

  // 회원 등급
  const grade = [
    { id: 0, name: "BRONZE" },
    { id: 1, name: "SILVER" },
    { id: 2, name: "GOLD" },
    { id: 3, name: "VIP" },
    { id: 4, name: "VVIP" },
  ];

  // 회원 리스트 조회
  const adminuserlist = () => {
    axios
      .get(`/admin/user?page=${page}&size=30`)
      .then((res) => {
        setPage((page) => page + 1);
        setUserlist([...userlist, ...res.data.content]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 회원 검색
  const searchUser = () => {
    axios
      .post("/admin/user/search", {
        memberId: searchData,
      })
      .then((res) => {
        const { data } = res;
        setUserlist(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <AdminUserWrap>
      <TitleWrap>
        <span>회원관리</span>
        <input
          type="text"
          id="search"
          name="search"
          maxLength="20"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchUser();
          }}
        />
        <img
          alt="검색 아이콘"
          src={search_icon}
          onClick={() => {
            searchUser();
          }}
        />
      </TitleWrap>
      <TableWrap>
        <TableTitleWrap>
          <TableTitle width={213}>아이디</TableTitle>
          <TableTitle width={148}>이름</TableTitle>
          <TableTitle width={213}>연락처</TableTitle>
          <TableTitle width={133}>회원등급</TableTitle>
          <TableTitle width={183}>마일리지</TableTitle>
          <TableTitle width={105} right>
            쿠폰
          </TableTitle>
        </TableTitleWrap>
        {userlist.map((user, index) => user.member_ID!=="admin"&&(
          
          <User key={index}>
            <Link
              to={`/admin/user/detail`}
              state={{ member_id: user.member_ID }}
            >
              <UserInfo width={163} align="left">
                {user.member_ID}
              </UserInfo>
              <UserInfo width={98}>{user.name}</UserInfo>
              <UserInfo width={163}>{user.phone}</UserInfo>
              <UserInfo width={83}>
                {grade.find((g) => g.id === user.grade).name}
              </UserInfo>
              <UserInfo width={133} align="right">
                {user.mile.toLocaleString("ko-KR")}
              </UserInfo>
              <UserInfo width={55} align="right" right>
                {user.cnt.toLocaleString("ko-KR")}개
              </UserInfo>
            </Link>
          </User>
        ))}
      </TableWrap>
      <div ref={ref}></div>
    </AdminUserWrap>
  );
}

export default AdminUser;

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
    outline: none !important;
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

const User = styled.div`
  width: 1005px;
  height: 30px;
  margin-bottom: 25px;
`;

const UserInfo = styled.span`
  float: left;
  width: ${(props) => props.width}px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-align: ${(props) => props.align || "center"};
  border-right: ${(props) =>
    props.right ? "0" : "2px solid rgba(185, 168, 154, 0.5)"};
  padding: 0 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
