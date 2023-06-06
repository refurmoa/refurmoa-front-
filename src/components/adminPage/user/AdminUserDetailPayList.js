import "./AdminUserDetailPayList.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminUserDetailPayListItem from "./AdminUserDetailPayListItem";

// 이미지파일
import cancelicon from "../../../images/cancel.png";

// 더미데이터
import dummydata from "./AdminUserDetailPayList.json"

export const AdminUserDetailPayList = ({ setPageNum, id }) => {
  const navigate = useNavigate();
  const [payListData, setPayListData] = useState();
  const [invoiceInputState, setInvoiceInputState] = useState(false);
  
  const changePage = () => {
    setPageNum(0);
  };

  const searchRef = useRef();
  // const [userlist, setUserlist] = useState();
  const AUDsearch = () => {
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      searchRef.current.focus();
      return false;
    }

    const searchData = { id: id, searchword : searchRef.current.value }
    console.log(searchData);
    // axios
    // .post("/admin/user/detail/pay/search", {
    //   searchData,
    // })
    // .then((res) => {
    //   const { data } = res;
    //   setPayListData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  };

  const getPayList = () => {
    const requestData = { 
      member_id: id,
      page: 0,
      size: 10
    }
    axios.post("/user/payment", requestData)
    .then((res) => {
      const { data } = res;
      setPayListData(data.content);
    })
  }

  useEffect(() => {
    getPayList();
  }, [])

  return (
    <div>
      <top className="AUDPayList">
        <div className="AUDPayListL">결제 내역</div>
        <div className="AUDPayListM" onClick={() => {changePage()}}>
          입찰 내역
        </div>
        <div className="AUDinput">
          <input className="AUDsearchbox" ref={searchRef} type="text"></input>
          <input
            className="AUDsearchboxbutton"
            type="button"
            onClick={AUDsearch}
          ></input>
        </div>
      </top>
      {payListData?.length === 0 ? (
        <NoPayList>
          결제내역이 없습니다.
        </NoPayList>
      ) : (
        <PayList>
          {payListData?.map((data, index) => (
            <AdminUserDetailPayListItem data={data} index={index} getPayList={getPayList}/>
          ))}
        </PayList>
      )}
        
    </div>
  );
};

const NoPayList = styled.div`
  width: 100%;
  height: 123px;

  text-align: center;
  line-height: 117px;
  font-size: 18px;
  color: #777777;

  box-sizing: border-box;
  border-bottom: 2px solid rgba(185, 168, 154, 0.3);
`;

const PayList = styled.div`
  height: 925px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: #D9D9D9;
  }
`;
