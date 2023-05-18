import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// 시간계산 함수
import { getDdayArray } from "../shared/sharedFn";

// 더미데이터
import productlist from "../shared/prod.json";

// 이미지파일
import timeicon from "../../images/time_icon.png";
import timeredicon from "../../images/time_icon_red.png";
import star_icon_line from "../../images/star_icon_line-240.png";
import star_icon_filled from "../../images/star_icon_filled-240.png";
import searchicon from "../../images/search.png"

const BookmarkList = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const [bookmarkProd, setBookmarkProd] = useState();
  const [today, setToday] = useState(new Date().getTime()); // 현재날짜(ms) 구하기

  // 남은시간이 12시간보다 적을 경우
  const lessThanTwelve = (ms) => {
    const diff = ms - today;
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (day === 0) {
      return hours < 12;
    } else {
      return false;
    }
  };

  // 남은시간(ms) 계산 후 string로 반환
  const getDdayString = (destination_date_ms) => {
    const { day, hours, minutes, seconds } = getDdayArray(destination_date_ms);
    const ddayString = `${day === 0 ? `` : `${day}일`} 
                        ${hours === 0 ? `` : `${hours}시간`} 
                        ${minutes === 0 ? `` : `${minutes}분`} 
                        ${seconds === 0 ? `` : `${seconds}초`}`;
    return ddayString;
  };

  // 시작일이 현재시간보다 크면 start_date(시작일), 작으면 end_date(종료일)로 남은시간 받아오기
  const getDday = ({ start_date, end_date }) => {
    if (Date.parse(start_date) > today) {
      return getDdayString(Date.parse(start_date));
    } else {
      return getDdayString(Date.parse(end_date));
    }
  };

  // 찜버튼
  const likeHandler = (event, board_num) => {
    event.stopPropagation(); // 이벤트 버블링 막기
    const likerequest = { board_num: board_num, id: "회원정보" };
    console.log(likerequest);
    // axios.post("/api/like", likerequest)
    // .then((res) => {
    //   console.log(res);
    //   getBookmarkData();
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  };

  // 조회수 올리는 axios 요청 후 성공하면 상세페이지 넘어가기
  const prodDetailHandler = (board_num) => {
    console.log("dd");
    navigate(`/post/detail/${board_num}`);
    // const readrequest = { board_num: board_num };
    // axios.post("/api/plusreadcount", readrequest)
    // .then((res) => {
      //   // console.log(res);
      //   navigate(`/post/detail/${board_num}`);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  };

  // 검색기능
  const searchHandler = () => {
    // console.log(searchRef.current.value);
    if (searchRef.current.value === "") {
      return alert("검색어를 입력해 주세요.");
    }
    const searchData = { searchword : searchRef.current.value, id: "userID" }
    console.log(searchData);
    // axios.post("/api/searchbookmark", searchData)
    // .then((res) => {
    //   console.log(res);
    //   const { data } = res;
    //   setBookmarkProd(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
  }
  // 엔터키
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      searchHandler();
    }
  }

  // 찜한상품 데이터 가져오기
  const getBookmarkData = () => {
    const datarequest = { id: "유저정보" };
    // axios.post("/api/bookmarkprod", datarequest)
    // .then((res) => {
    //   const { data } = res;
    //   setBookmarkProd(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    const data = productlist.prodlist;
    setBookmarkProd(data);
  };

  // 1초마다 리렌더링
  useEffect(() => {
    const countdown = setInterval(() => {
      setToday(new Date().getTime());
    }, 1000);
    return () => clearInterval(countdown);
  }, [today]);

  useEffect(() => {
    getBookmarkData();
  }, [bookmarkProd]);


  return (
    <BookmarkListWrapper>
      <TitleAndSearchBox>
        <TitleBox>찜한 상품</TitleBox>
        <SearchBar>
          <SearchInput>
            <input type="text" ref={searchRef} onKeyDown={(e) => {activeEnter(e)}}/>
          </SearchInput>
          <SearchImg onClick={() => {searchHandler()}}>
            <img src={searchicon} alt="searchicon"/>
          </SearchImg>
        </SearchBar>
      </TitleAndSearchBox>
      <BookmarkListBox>  
        {bookmarkProd?.map((data) => (
          <ProductBox
            key={data.board_num}
            onClick={() => prodDetailHandler(data.board_num)}
          >
            <ImageBox>
              <img src={`/images/prod/${data.main_image}`} alt="productimage" />

              {/* 경매, 즉시구매 글자 렌더링 */}
              {data.sell_type === 1 && <Auction>경매</Auction>}
              {data.sell_type === 2 && <DirectBuy>즉시구매</DirectBuy>}
              {data.sell_type === 3 && (
                <>
                  <DirectAndAuction>
                    <div>경매</div>
                    <div>즉시구매</div>
                  </DirectAndAuction>
                </>
              )}

              {/* 찜 유무 */}
              {data.like === 0 ? (
                <StarIcon
                  onClick={(event) => likeHandler(event, data.board_num)}
                >
                  <img src={star_icon_line} alt="staricon" />
                </StarIcon>
              ) : (
                <StarIcon
                  onClick={(event) => likeHandler(event, data.board_num)}
                >
                  <img src={star_icon_filled} alt="staricon" />
                </StarIcon>
              )}

              {/* 판매완료 상품 어둡게 */}
              {data.prod_state === 2 && <DarkCover />}
              {/* 판매완료(상품현황1이지만 경매종료일 지난) 상품 */}
              {(data.prod_state === 1) & (Date.parse(data.end_date) < today) ? (
                <DarkCover />
              ) : null}
              {/* 오픈예정 상품 어둡게 */}
              {Date.parse(data.start_date) > today && (
                <DarkCover>
                  <span>경매 오픈 예정</span>
                </DarkCover>
              )}
            </ImageBox>
            <InfoBox>
              {/* 경매상품이거나 경매, 즉시구매이고 오픈예정이 아니고 경매종료일이 지나지 않은 상품 */}
              {(((data.sell_type === 1) & (data.prod_state === 1)) |
                ((data.sell_type === 3) & (data.prod_state === 1))) &
              (Date.parse(data.start_date) < today) &
              (Date.parse(data.end_date) > today) &
              (lessThanTwelve(Date.parse(data.end_date)) !== true) ? (
                <TimeBox>
                  <img src={timeicon} alt="timeicon" />
                  {getDday(data)}
                </TimeBox>
              ) : null}
              {/* 12시간 미만 상품 빨간색으로 남은시간 표시 */}
              {(((data.sell_type === 1) & (data.prod_state === 1)) |
                ((data.sell_type === 3) & (data.prod_state === 1))) &
              (Date.parse(data.start_date) < today) &
              (Date.parse(data.end_date) > today) &
              (lessThanTwelve(Date.parse(data.end_date)) === true) ? (
                <RedTimeBox>
                  <img src={timeredicon} alt="timeicon" />
                  {getDday(data)}
                </RedTimeBox>
              ) : null}

              {/* 경매오픈예정 상품 */}
              {Date.parse(data.start_date) > today && (
                <TimeBox>
                  <img src={timeicon} alt="timeicon" />
                  {getDday(data)}
                </TimeBox>
              )}

              {/* 즉시구매, 판매중 상품 */}
              {(data.sell_type === 2) & (data.prod_state === 1) ? (
                <TimeBox>─</TimeBox>
              ) : null}

              {/* 판매완료(상품현황: 2) 상품 */}
              {data.prod_state === 2 && (
                <TimeBox>
                  <img src={timeicon} alt="timeicon" />
                  판매종료
                </TimeBox>
              )}
              {/* 판매완료(상품현황1이지만 경매종료일 지난) 상품 */}
              {(data.prod_state === 1) & (Date.parse(data.end_date) < today) ? (
                <TimeBox>
                  <img src={timeicon} alt="timeicon" />
                  판매종료
                </TimeBox>
              ) : null}

              <PrdoInfoBox>
                <ProdNameBox>{data.prod_name}</ProdNameBox>

                {/* 경매 */}
                {data.sell_type === 1 && (
                  <OriAndNowPriceBox>
                    <span>{data.org_price.toLocaleString("ko-KR")}원</span>
                    {data.cur_price.toLocaleString("ko-KR")}원
                  </OriAndNowPriceBox>
                )}

                {/* 즉시구매 */}
                {data.sell_type === 2 && (
                  <OriAndNowPriceBox>
                    <span>{data.org_price.toLocaleString("ko-KR")}원</span>
                    {data.direct_price.toLocaleString("ko-KR")}원
                  </OriAndNowPriceBox>
                )}

                {/* 경매, 즉시구매 */}
                {data.sell_type === 3 && (
                  <>
                    <OriAndNowPriceBox>
                      <span>{data.org_price.toLocaleString("ko-KR")}원</span>
                      {data.cur_price.toLocaleString("ko-KR")}원
                    </OriAndNowPriceBox>
                    <DirectPriceBox>
                      <span>즉시구매가</span>
                      {data.direct_price.toLocaleString("ko-KR")}원
                    </DirectPriceBox>
                  </>
                )}
              </PrdoInfoBox>
            </InfoBox>
          </ProductBox>
        ))}
      </BookmarkListBox>
      </BookmarkListWrapper>
  )
}

export default BookmarkList

// 찜한상품리스트, 검색창
const BookmarkListWrapper = styled.div`
  font-family: 'Noto Sans';
  font-style: normal;
`;

const TitleAndSearchBox = styled.div`
  width: 1160px;
  height: 30px;
  margin: 40px auto 30px;
  display: flex;
  justify-content: space-between;
`;

const BookmarkListBox = styled.div`
  width: 1180px;
  margin: 0px auto;
`;

const TitleBox = styled.div`
  margin: 0px;
  color: #514438;
  
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;

const SearchBar = styled.div`
  margin: 0px;
  width: 220px;
  height: 30px;
  border: 1px solid #B9A89A;
  border-radius: 15px;
  
  display: flex;
`;

const SearchInput = styled.div`
  width: 80%;
  height: 75%;
  margin: 1px 5px 0px 15px;
  input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    color: #B9A89A;
  }
  input:focus {
    outline: none;
  }
`;

const SearchImg = styled.div`
  margin: 5px 10px 0px 0px;
  width: 17px;
  height: 17px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    color: #B9A89A;
  }
`;

const ProductBox = styled.div`
  width: 280px;
  height: 415px;
  margin: 0px 20px 20px 0px;
  display: inline-block;
  vertical-align: middle;

  :nth-child(4n) {
    margin-right: 0px;
  }
  :hover {
    cursor: pointer;
  }
`;

const ImageBox = styled.div`
  width: 280px;
  height: 280px;

  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StarIcon = styled.div`
  width: 30px;
  height: 30px;

  position: absolute;
  bottom: 10px;
  left: 10px;

  z-index: 1;
`;

const DarkCover = styled.div`
  width: 280px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 0px;
  left: 0px;

  span {
    height: 30px;
    color: rgba(255, 255, 255, 0.6);

    font-size: 25px;
    line-height: 280px;

    position: absolute;
    width: 280px;
    height: 280px;
    text-align: center;
  }
`;

const Auction = styled.div`
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #b2d4c1;
  border-radius: 5px;

  position: absolute;
  top: 10px;
  right: 10px;

  font-weight: 600;
  font-size: 16px;
`;

const DirectBuy = styled.div`
  width: 79px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #b2d4c1;
  border-radius: 5px;

  position: absolute;
  top: 10px;
  right: 10px;

  font-weight: 600;
  font-size: 16px;
`;

const DirectAndAuction = styled.div`
  font-weight: 600;
  font-size: 16px;

  div:first-child {
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #b2d4c1;
    border-radius: 5px;

    position: absolute;
    top: 10px;
    right: 99px;
  }
  div:last-child {
    width: 79px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #b2d4c1;
    border-radius: 5px;

    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const InfoBox = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const TimeBox = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b9a89a;
  margin: 3px 0px 0px 0px;
  img {
    width: 18px;
    height: 18px;
    margin: 2px 3px 0px 0px;
  }
`;

const RedTimeBox = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  margin: 3px 0px 0px 0px;
  img {
    width: 18px;
    height: 18px;
    margin: 2px 3px 0px 0px;
  }
`;

const PrdoInfoBox = styled.div`
  margin: 0px 5px 0px 5px;
`;


const ProdNameBox = styled.div`
  margin: 5px 0px 5px 0px;
  font-size: 20px;
  font-weight: 400;
`;


const OriAndNowPriceBox = styled.div`
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  span {
    font-weight: 400;
    font-size: 15px;
    color: #333333;
    text-decoration: line-through;
    margin-right: 12px;
  }
`;

const DirectPriceBox = styled.div`
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  span {
    font-weight: 400;
    font-size: 15px;
    color: #333333;
    margin-right: 10px;
  }
`;