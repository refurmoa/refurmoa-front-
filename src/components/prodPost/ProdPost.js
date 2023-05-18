import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getDdayArray } from "../shared/sharedFn";

// 더미데이터
import productlist from "../shared/prod.json";

// 이미지파일
import timeicon from "../../images/time_icon.png";
import timeredicon from "../../images/time_icon_red.png";
import star_icon_line from "../../images/star_icon_line-240.png";
import star_icon_filled from "../../images/star_icon_filled-240.png";

const ProdPost = ({ filter }) => {
  const {selectedSellType, selectedCategory, selectedSellStatus, selectedOrderby} = filter;
  const navigate = useNavigate();
  const [prodData, setProdData] = useState();
  const [today, setToday] = useState(new Date().getTime()); // 현재날짜(ms) 구하기

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
    const {day, hours, minutes, seconds} = getDdayArray(destination_date_ms);
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
      // console.log(res);
    //   getProdData();
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

  // 판매목록 데이터 받아오기
  const getProdData = () => {
    console.log("판매방식 : " + selectedSellType);
    console.log("카테고리 : " + selectedCategory);
    console.log("판매상태 : " + selectedSellStatus);
    console.log("정렬 : " + selectedOrderby);
    // axios.get(`/api/products?selltype=${selectedSellType}&category=${selectedCategory}&sellstatus=${selectedSellStatus}&orderby=${selectedOrderby}`)
    // .then((res) => {
    //   const { data } = res;
    //   setProdData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    const data = productlist.prodlist; 
    setProdData(data);
  };

  // 1초마다 리렌더링
  useEffect(() => {
    const countdown = setInterval(() => {
      setToday(new Date().getTime());
    }, 1000);
    return () => clearInterval(countdown);
  }, [today]);

  useEffect(() => {
    // 필터조건이 바뀔때마다 데이터에 axios 요청
    getProdData();
  }, [prodData, selectedSellType, selectedCategory, selectedSellStatus, selectedOrderby]);

  return (
    <>
      {prodData?.map((data) => (
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
              <StarIcon onClick={(event) => likeHandler(event, data.board_num)}>
                <img src={star_icon_line} alt="staricon" />
              </StarIcon>
            ) : (
              <StarIcon onClick={(event) => likeHandler(event, data.board_num)}>
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
              <ProdComBox>{data.prod_com}</ProdComBox>
              <ProdNameBox>{data.prod_name}</ProdNameBox>

              {/* bid_count가 null이 아닐경우에만 경매참여자 렌더링 */}
              {data.bid_count !== null && (
                <BidCountBox>경매참여자 : {data.bid_count}명</BidCountBox>
              )}

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
    </>
  );
};

export default ProdPost;

const ProductBox = styled.div`
  width: 300px;
  height: 525px;
  margin: 0px 50px 50px 0px;
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
  width: 300px;
  height: 300px;

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
  width: 300px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 0px;
  left: 0px;

  span {
    color: rgba(255, 255, 255, 0.6);

    font-size: 25px;
    line-height: 300px;

    position: absolute;
    width: 300px;
    height: 300px;
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

const ProdComBox = styled.div`
  margin-top: 10px;
  height: 20px;
  font-size: 18px;
  font-weight: 400;
  color: #777777;
`;

const ProdNameBox = styled.div`
  margin: 5px 0px 5px 0px;
  font-size: 25px;
  font-weight: 400;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BidCountBox = styled.div`
  margin: 10px 0px 0px 0px;
  text-align: right;
  font-size: 18px;
  font-weight: 400;
  color: #888888;
`;

const OriAndNowPriceBox = styled.div`
  text-align: right;
  font-size: 25px;
  font-weight: 600;
  span {
    font-weight: 400;
    font-size: 18px;
    color: #333333;
    text-decoration: line-through;
    margin-right: 12px;
  }
`;

const DirectPriceBox = styled.div`
  text-align: right;
  font-size: 25px;
  font-weight: 600;
  span {
    font-weight: 400;
    font-size: 18px;
    color: #333333;
    margin-right: 10px;
  }
`;
