import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

// 더미데이터
import unAnsweredWritings from "./UnAnswered.json";
import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';


const UnAnswered = () => {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const [unAnsweredData, setUnAnsweredData] = useState();


  const getUnAnsweredData = () => {
    // axios.get("/admin/unanswered")
    // .then((res) => {
    //   const { data } = res;
    //   setUnAnsweredData(data.content);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    setUnAnsweredData(unAnsweredWritings);
  }

  useEffect(() => {
    getUnAnsweredData();
  }, [])

  return (
    <UnAnsweredWrapper>
      <TitleBox><span>미답변 상품 문의</span></TitleBox>
      <WritingsListBox>
        {unAnsweredData?.map((item, index) => (
          <WritingItem key={index}>
            <WritingTitle onClick={() => {navigate(`/post/detail/${item.board_num}`)}}><span>{item.title}</span></WritingTitle>
            <WritingTime><span>{item.date}</span></WritingTime>
          </WritingItem>
        ))}
        
      </WritingsListBox>
    </UnAnsweredWrapper>
  )
}

export default UnAnswered

const UnAnsweredWrapper = styled.div`
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

const WritingsListBox = styled.div`
  width: 100%;
  height: 660px;

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

const WritingItem = styled.div`
  width: 580px;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  border-bottom: 2px solid rgba(185, 168, 154, 0.3);
  
`;

const WritingTitle = styled.div`
  margin: 0px;
  width: 390px;
  
  span {  
    margin: 0px 0px 0px 15px;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    cursor: pointer;
  }
`;

const WritingTime = styled.div`
  margin: 0px;

  span {
    margin: 0px 15px 0px 0px;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
  }
`;