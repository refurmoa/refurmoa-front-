// 마이 페이지 - 입찰 내역
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MemberInfo from "./MemberInfo";

import data from './mypageprod.json';


function MyPageBidList() {
  const navigate = useNavigate();
  const [bidlist, setBidlist] = useState(data); // 입찰 내역
  const [status, setStatus] = useState("all"); // 진행 상태
  const [month, setMonth] = useState(3); // 월단위 범위
  const [search, setSearch] = useState(); // 검색어
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [now, setNow] = useState(moment()); // 현재 시간
  
  useEffect(() => {
    // 1초마다 현재 시간 재설정
    const interval = setInterval(() => { setNow(moment()) }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 입찰 내역 조회
  const getBidList = () => {
    // setBidlist();
  }
  useState(() => { getBidList(); }, [currentPage]);

  // 타이머
  const runningTimer = (end_date) => {
    const duration = moment.duration(end_date.diff(now));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const timerText = `${days === 0 ? `` : `${days}일`} 
                      ${hours === 0 ? `` : `${hours}시간`} 
                      ${minutes === 0 ? `` : `${minutes}분`} 
                      ${seconds === 0 ? `` : `${seconds}초`}`;

    if (moment(end_date).isBefore(moment())) {
      return (
        <TimerWrap>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <path fill="gray" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/>
          </svg>
          <Timer color={"gray"}>경매종료</Timer>
        </TimerWrap>
      );
    } else if (days === 0 && hours < 12) {
      return (
        <TimerWrap>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <path fill="red" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/>
          </svg>
          <Timer color={"red"}>{timerText}</Timer>
        </TimerWrap>
      );
    } else {
      return (
        <TimerWrap>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <path fill="black" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/>
          </svg>
          <Timer color={"black"}>{timerText}</Timer>
        </TimerWrap>
      );
    }
  };


  return (
    <>
      <MemberInfo />
      <Wrapper>
        <Top>
          <TopLeft>
            <Title>입찰 내역</Title>
            <StatusFilter>
              <input type="radio" id="status_all" name="status" checked={status === "all"} onChange={() => setStatus("all")} />
              <label htmlFor="status_all">전체</label>
              <input type="radio" id="status_ing" name="status" checked={status === "ing"} onChange={() => setStatus("ing")} />
              <label htmlFor="status_ing">진행중</label>
              <input type="radio" id="status_end" name="status" checked={status === "end"} onChange={() => setStatus("end")} />
              <label htmlFor="status_end">종료</label>
            </StatusFilter>
            <MonthFilter>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="3" defaultValue>3개월</option>
                <option value="6">6개월</option>
                <option value="12">12개월</option>
                <option value="0">전체</option>
              </select>
            </MonthFilter>
          </TopLeft>
          <TopRight>
            <SearchBox type="search" id="search" name="search"
              value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {if (e.key === 'Enter') search();}} />
            <SearchIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/>
              </svg>
            </SearchIcon>
          </TopRight>
        </Top>

        {/* 입찰 내역 */}
        <BidList>
          { bidlist?.map((list) => (
            <ListWrap key={list.board_num} onClick={() => navigate(`/post/detail/${list.board_num}`)}>
              <MainImage>
                <img alt={list.prod_name} src={`/images/prod/${list.main_image}`} />
                { moment(list.end_date).isBefore(moment()) && (
                  list.bid_price < list.cur_price ? <ImageBlackWrap color={'#D4B2B2'}>패찰</ImageBlackWrap>
                  : list.bid_price > list.cur_price ? <ImageBlackWrap color={'#D4B2B2'}>낙찰취소</ImageBlackWrap>
                  : <ImageBlackWrap color={'#B2D4C1'}><div>낙찰</div></ImageBlackWrap> )}
              </MainImage>
              <ListTextWrap>
                {runningTimer(moment(list.end_date))}
                <ProdCom>{list.prod_com}</ProdCom>
                <ProdName>{list.prod_name}</ProdName>
                <BidCount>경매참여자 : {list.bid_count}명</BidCount>
                <Price>
                  <BidPriceWrap text>
                    <BidPrice text>나의 입찰가</BidPrice>
                    <BidPrice text>현재가</BidPrice>
                  </BidPriceWrap>
                  <BidPriceWrap>
                    <BidPrice>{list.bid_price?.toLocaleString('ko-KR')}원</BidPrice>
                    <BidPrice>{list.cur_price?.toLocaleString('ko-KR')}원</BidPrice>
                  </BidPriceWrap>
                </Price>
              </ListTextWrap>
            </ListWrap>
          ))}
        </BidList>
      </Wrapper>


      {/* 페이지 */}
      { totalPage > 0 &&
        <PageWrap>
          { currentPage === 1 ? <Page prev gray>&lt;</Page>
            : <Page prev onClick={() => setCurrentPage(currentPage-1)}>&lt;</Page> }
          <Page>{currentPage}</Page> <Page center gray>/</Page> <Page gray>{totalPage}</Page>
          { currentPage === totalPage ? <Page next gray>&gt;</Page>
            : <Page next onClick={() => setCurrentPage(currentPage+1)}>&gt;</Page> }
        </PageWrap>
      }

    </>
  );
};

export default MyPageBidList;


const Wrapper = styled.div`
  width: 1180px;
  margin: 35px auto 0;
`;

const Top = styled.div`
  display: flex;
  height: 30px;
  margin: 0 10px;
  justify-content: space-between;
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const Title = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
`;

const StatusFilter = styled.div`
  display: inline-block;
  height: 30px;
  margin-left: 40px;

  input {
    width: 15px;
    height: 15px;
  }

  label {
    width: 60px;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    padding-left: 7px;
    margin-right: 20px;
  }
`;

const MonthFilter = styled.span`
  background-color: #EEEEEE;
  padding-right: 3px;

  select {
    height: 25px;
    font-size: 15px;
    padding: 0 3px;
    border-width: 0;
    background-color: rgba(0, 0, 0, 0);
  }
`;

const TopRight = styled.div`
  position: relative;
  display: flex;
  margin: 0;
`;

const SearchBox = styled.input`
  width: 220px;
  height: 30px;
  border: 1px solid #AAAAAA;
  border-radius: 15px;
  padding: 0 40px 0 10px;

  :focus {
    outline: none;
    border-color: #514438;
  }
`;

const SearchIcon = styled.div`
  svg {
    position: absolute;
    right: 10px;
    margin-top: 5px;
    cursor: pointer;
  }

  path { fill: #AAAAAA; }
`;

// 입찰내역
const BidList = styled.div`
  width: 1180px;
  display: grid;
  grid-template-columns: repeat(2, 580px);
  grid-gap: 20px;
  margin-top: 30px;
`;

const ListWrap = styled.div`
  width: 580px;
  height: 220px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const MainImage = styled.span`
  position: relative;
  float: left;
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ImageBlackWrap = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 200px;
  height: 200px;
  font-weight: bold;
  font-size: 30px;
  line-height: 200px;
  text-align: center;
  color: #D4B2B2;
  background-color: rgba(0, 0, 0, 0.4);

  div {
    position: absolute;
    top: 10px; left: 10px;
    width: 180px;
    height: 180px;
    box-sizing: border-box;
    line-height: 180px;
    color: #D4FBE5;
    border: 3px solid #FFFFFF;
  }
`;

const ListTextWrap = styled.span`
  position: relative;
  float: right;
  width: 340px;
  height: 200px;
`;

const TimerWrap = styled.div`
  display: flex;
  width: 340px;
  height: 20px;
  align-items: center;
  margin-top: 3px;

  svg { margin: 0; }
`;

const Timer = styled.div`
  display: flex;
  height: 20px;
  line-height: 20px;
  color: ${(props) => props.color};
  margin: 0 0 0 7px;
`;

const ProdCom = styled.div`
  width: 340px;
  height: 20px;
  font-weight: 500;
  line-height: 20px;
  margin-top: 15px;
  overflow: hidden;
`;

const ProdName = styled.div`
  width: 340px;
  max-height: 50px;
  font-size: 18px;
  line-height: 25px;
  margin-top: 5px;
`;

const BidCount = styled.div`
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #999999;
  margin-top: 5px;
`;

const Price = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 56px;
`;

const BidPriceWrap = styled.span`
  float: left;
  height: 56px;
  margin-right: ${(props) => props.text && '7px'};
`;

const BidPrice = styled.div`
  height: 28px;
  font-weight: ${(props) => !props.text && '500'};
  font-size: ${(props) => !props.text ? '18px' : '14px'};
  line-height: 28px;
  color: ${(props) => props.text && '#333333'};
  text-align: right;
`;

// 페이지 출력
const PageWrap = styled.div`
  height: 30px;
  text-align: center;
  margin-top: 50px;
`;

const Page = styled.span`
  font-weight: ${(props) => !props.center && 'bold'};
  font-size: 18px;
  line-height: 30px;
  color: ${(props) => props.gray ? 'rgba(81, 68, 56, 0.5)' : 'rgba(81, 68, 56, 0.8)'};
  margin-right: ${(props) => props.prev ? '20px' : props.center && '10px'};
  margin-left: ${(props) => props.next ? '20px' : props.center && '10px'};
  cursor: ${(props) => !props.gray && 'pointer'};
`;