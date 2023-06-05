import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

// 더미데이터
import adminMemoDummyData from "./AdminMemo.json"

// 이미지
import memoinputBtn from "../../images/memo_input_btn.png";

const AdminMemo = () => {
  const memoListRef = useRef();
  const memoInputRef = useRef();
  const [adminMemoData, setAdminMemoData] = useState();

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      inputMemo()
    }
  }
  const inputMemo = () => {
    axios.post("/admin/memo/write", { content: memoInputRef.current.value })
    .then((res) => {
      getAdminMemo();
    })
    .catch((e) => {
      console.error(e);
    })
    memoInputRef.current.value = "";
  }


  const getAdminMemo = () => {
    axios.get("/admin/memo")
    .then((res) => {
      const { data } = res;
      setAdminMemoData(data);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    getAdminMemo();
  }, [])

  // memoData를 받아오면 스크롤 하단에서 시작
  // useEffect(() => {
  //   memoListRef.current.scrollTop = memoListRef.current.scrollHeight;
  // }, [adminMemoData])

  return (
    <AdminMemeoWrapper>
      <TitleBox><span>MEMO</span></TitleBox>
      <MemoInputBox>
        <input type="text" ref={memoInputRef} onKeyDown={(e) => {activeEnter(e)}} />
        <img src={memoinputBtn} alt="memoinputbutton" onClick={() => {inputMemo()}}/>
      </MemoInputBox>
      <MemoListBox ref={memoListRef}>
        {/* 무한스크롤 */}
        {adminMemoData?.map((item, index) => (
          <MemoItem key={index}>{item.content}</MemoItem>
        ))}
      </MemoListBox>
      
    </AdminMemeoWrapper>
  )
}

export default AdminMemo

const AdminMemeoWrapper = styled.div`
  margin: 0px;
  width: 580px;
  height: 700px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 50px;

  font-weight: 700;
  font-size: 20px;
  line-height: 50px;

  box-sizing: border-box;
  border-bottom: 1px solid #000000;

  span {
    margin-left: 15px;
  }
`;

const MemoListBox = styled.div`
  width: 100%;
  height: 555px;

  background-color: rgba(238, 238, 238, 0.4);

  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: #D9D9D9;
  }
`;

const MemoItem = styled.div`
  margin: 10px 15px 10px 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const MemoInputBox = styled.div`
  width: 100%;
  height: 105px;
  background-color: rgba(238, 238, 238, 0.4);

  position: relative;

  input {
    margin: 30px 15px 0px;
    padding: 10px 60px 10px 10px;
    width: 550px;
    height: 60px;
    box-sizing: border-box;
    font-size: 20px;
  }
  img {
    width: 30px;
    height: 30px;

    cursor: pointer;

    position: absolute;
    right: 25px;
    bottom: 30px;
  }
`;