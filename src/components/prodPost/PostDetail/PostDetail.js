// 판매 상세 페이지

import "./PostDetail.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import moment from "moment/moment";
import { getDdayArray } from "../../shared/Timer";
import PostProdDetail from "./PostProdDetail";
import ProdInquiry from "./ProdInquiry";
import SellInfo from "./SellInfo";
import star_icon_filled from "../../../images/star_icon_filled-240.png";
import star_icon_line from "../../../images/star_icon_line-240.png";
import info_icon_brown from "../../../images/info_icon_brown-240.png";
import arrow_icon_brown from "../../../images/arrow_icon_brown-240.png";

function PostDetail() {
  const board_num = useParams().board_num;
  const navigate = useNavigate();
  const login_id = window.sessionStorage.getItem("id"); // 세션 ID
  const [prodInfo, setProdInfo] = useState({ // 상품 상세 정보
    product_code: 0, // 제품코드
    sell_type: 0, // 판매방식
    main_image: "", // 메인 이미지
    prod_com: "", // 제품 회사명
    prod_name: "", // 제품 이름
    prod_grade: "", // 제품 상태
    org_price: 0, // 원가
    direct_price: 0, // 즉시구입가
    auction_price: 0, // 경매시작가
    unit_price: 0, // 입찰 단위
    guarantee: false, // 보증서
    as_date: 0, // AS 기간
    delivery_price: 0, // 배송설치비
    cur_price: 0, // 현재가
    detail_image: "", // 상품 상세정보
    start_date: null, // 경매 시작일
    end_date: null, // 경매 종료일
    defect_text: null, // 하자 정보
    defect_image1: null, // 하자 이미지1
    defect_image2: null, // 하자 이미지2
    defect_image3: null, // 하자 이미지3
    like: false // (로그인)회원 찜 상태
  });
  const [bidList, setBidList] = useState([]); // 입찰 내역
  const [state, setState] = useState(); // 판매 상태 (0 : 판매예정, 1 : 판매중, 2 : 판매종료)
  const [stateHovered, setStateHovered] = useState(0); // info 아이콘 내용 (1 : 상품상태, 2 : 배송설치비, 3 : 입찰방법, 4 : 하자정보)
  const [bidPrice, setBidPrice] = useState(); // 입찰가
  const [countBid, setCountBid] = useState(0); // 입찰 수
  const [bidListState, setBidListState] = useState(false); // 입찰내역 열기/닫기
  const [bidref, inViewBid] = useInView(); // 입찰내역 하단 추적
  const [bidPage, setBidPage] = useState(0); // 입찰내역 페이지
  const [bidTotalPage, setBidTotalPage] = useState(0); // 입찰내역 총 페이지
  const [imageView, setImageView] = useState(0); // 하자 이미지 모달 창
  const [detailInfo, setDetailInfo] = useState(1); // 메뉴 (1 : 상세정보, 2 : 상품문의, 3 : 결제 및 배송, 4 : 교환환불)
  const [now, setNow] = useState(new Date().getTime()); // 현재 날짜(ms)
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const today = new Date();
  
  // sell_type => 1 : 경매, 2 : 즉시구매, 3 : 경매+즉시구매

  useEffect (() => {
    // 상품 정보 조회
    getPost();

    // 입찰 내역 조회
    getBidList();

    // 타이머 > 1초마다 리렌더링
    const countdown = setInterval(() => {
      setNow(new Date().getTime());
      getDday();
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => { // 페이징
    if ((inViewBid) && (bidListState)) { // 입찰내역
      getBidList();
    }
  }, [inViewBid]);

  // 상품 정보 조회
  const getPost = () => {
    axios
      .post("/post/detail", {
        memberId: login_id,
        boardNum: board_num
    })
      .then((res) => {
        setProdInfo(res.data);
        setBidPrice(res.data.cur_price + res.data.unit_price);
        setStart(new Date(res.data.start_date));
        setEnd(new Date(res.data.end_date));
        setState(end-today < 1 ? 2 : start-today > 1 ? 0 : 1);
      })
      .catch((e) => {
        // console.error(e);
      });
  }

  // 입찰 내역 조회
  const getBidList = () => {
    if (bidPage === 0 || bidPage < bidTotalPage) {
      axios
        .get(`/post/detail/bid?board_num=${board_num}&page=${bidPage}&size=7`)
        .then((res) => {
          setBidList([...bidList, ...res.data.content]);
          setBidPage((page) => page+1);
          setCountBid(res.data.totalElements);
          setBidTotalPage(res.data.totalPages);
        })
        .catch((e) => {
          // console.error(e);
        });
    }
  }

  // 삭제
  const postDelete = () => {
    const deleteQ = window.confirm("정말 삭제하시겠습니까?");
    if (deleteQ) {
      axios
        .get(`/post/detail/delete?board_num=${board_num}`)
        .then(() => {
            alert("게시글이 삭제되었습니다.");
            navigate("/post");
        })
        .catch((e) => {
          alert("삭제에 실패하였습니다. 다시 시도해주세요.");
        });
    }
  };

  // 찜 등록/취소
  const starClick = () => {
    if (login_id === null) {
      navigate("/login");
    } else {
      axios.post("/post/like", {
        memberId: login_id,
        boardNum: board_num,
        like: prodInfo.like
      })
      .then(() => {
          getPost();
      })
      .catch((e) => {
        // console.errer(e);
      })
    }
  };

  // 상품 설명 상세 정보 (상태 : grade, 배송설치비 : delivery, 입찰가 : bid_info, 하자정보 : DefectInfo)
  const InfoIconClick = (content) => {
    // content === "grade" ?  : content === "delivery" ?  : ;
  }

  // 타이머
  const getDday = () => {
    const end_date = new Date(prodInfo.end_date);
    const {day, hours, minutes, seconds} = getDdayArray(Date.parse(end_date));
    const red = day === 0 && hours < 12 ? true : false;
    return (
      <li className="PD-price_info_text">
        <span>남은시간</span>
        { day !== 0 && <>
          <span className={red ? "PD-timer_num_red" : "PD-timer_num"}>{day}</span>
          <span className={red ? "PD-timer_text_red" : "PD-timer_text"}>일&nbsp;</span>
          </>
        }
        { hours !== 0 && <>
          <span className={red ? "PD-timer_num_red" : "PD-timer_num"}> {hours}</span>
          <span className={red ? "PD-timer_text_red" : "PD-timer_text"}>시간&nbsp;</span>
          </>
        }
        { minutes !== 0 && <>
          <span className={red ? "PD-timer_num_red" : "PD-timer_num"}> {minutes}</span>
          <span className={red ? "PD-timer_text_red" : "PD-timer_text"}>분&nbsp;</span>
          </>
        }
        { seconds !== 0 && <>
        <span className={red ? "PD-timer_num_red" : "PD-timer_num"}> {seconds}</span>
        <span className={red ? "PD-timer_text_red" : "PD-timer_text"}>초&nbsp;</span>
        </>
      }
      </li>
    );
  };

  // 입찰가 설정 (minus / plus)
  const bidPriceUpdate = (c) => {
    c === "minus" ? setBidPrice(bidPrice - prodInfo.unit_price)
    : setBidPrice(bidPrice + prodInfo.unit_price);
  }

  // 입찰
  const bidBuy = () => {
    if (login_id === null) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    } else {
      const confirm = window.confirm(`${bidPrice?.toLocaleString('ko-KR')}원에 입찰하시겠습니까?`);
      if (confirm) {
        if (prodInfo.cur_price + prodInfo.unit_price == bidPrice) { // 입찰
          axios.post("/post/detail/bid/insert", {
            memberId: login_id,
            boardNum: board_num,
            bidPrice: bidPrice,
            unitPrice: prodInfo.unit_price
          })
          .then(() => {
            alert("입찰되었습니다.");
            getPost();
          })
          .catch((e) => {
            alert("입찰에 실패하였습니다. 다시 시도해주세요.");
          })
        } else {
          axios.post("/post/detail/bid/auto", {
            memberId: login_id,
            boardNum: board_num,
            autobidPrice: bidPrice,
            bidPrice: prodInfo.cur_price + prodInfo.unit_price,
            unitPrice: prodInfo.unit_price
          })
          .then(() => {
            alert("자동입찰되었습니다.");
            getPost();
          })
          .catch((e) => {
            alert("입찰에 실패하였습니다. 다시 시도해주세요.");
          })
        }
      }
    }
  }

  // 즉시구매
  const directBuy = () => {
    if (login_id === null) {
      navigate("/login");
    } else {
      navigate(`/post/pay/${board_num}?sell_type=2`, {
      })
    }
  };

  // 입찰내역 열기/닫기
  const bidListOut = () => {
      bidListState ? setBidListState(false)
      : login_id === null ? alert("로그인 후 확인 가능합니다.")
      : setBidListState(true);
  }

  // 입찰내역
  const bidListMap = bidList?.map((li, index) => (
    <li className="PD-bid_list_line" key={index}>
      <span className="PD-bid_list_id">
        { login_id === "admin" || login_id === li.member_id ? li.member_id
          : li.member_id.slice(0, 2) + "*".repeat(li.member_id.length-2) }
        { li.bid_auto && " [자동]" }
      </span>
      <span className="PD-bid_list_price">{li.bid_price?.toLocaleString('ko-KR')}원</span>
      <span className="PD-bid_list_date">{moment(li.bid_date).format("YYYY-MM-DD HH:mm:ss")}</span>
    </li>
  ));

  // 이미지 모달 창
  const imageViewChange = (i) => {
    if (imageView !== 0) setImageView(0);
    else if (i === 1) setImageView(1);
    else if (i === 2) prodInfo.defect_image2 !== null && setImageView(2);
    else if (i === 3) prodInfo.defect_image3 !== null && setImageView(3);
    else setImageView(0);
  }

  return (
    <div className="PD-wrap">
      {/* 경매/즉시구매/수정/삭제 */}
      <div className="PD-top">
        <span className="PD-selltype">
          <span className={prodInfo.sell_type === 2 ? "PD-selltype_none" : (state === 1 ? "PD-selltype_circle" : "PD-selltype_circle_end")}></span>
          <span className={prodInfo.sell_type === 2 ? "PD-selltype_none" : "PD-selltype_text"}>경매</span>
          <span className={prodInfo.sell_type === 1 ? "PD-selltype_none" : (state === 1 ? "PD-selltype_circle" : "PD-selltype_circle_end")}></span>
          <span className={prodInfo.sell_type === 1 ? "PD-selltype_none" : "PD-selltype_text"}>즉시구매</span>
        </span>
        {login_id === "admin" && 
          <span className="PD-update_delete">
            { state === 0 &&
              <Link to={`/post/update/${board_num}`}>수정</Link>
            }
            <span onClick={postDelete}>삭제</span>
          </span>
        }
      </div>

      <div className="PD-info_wrap">
          {/* 상품 정보 - 메인 이미지 */}
          <span className="PD-main_image_wrap">
            <div className="PD-star_position">
            <img className="PD-main_image" alt="상품이미지" src={`/images/prod/${prodInfo.main_image}`}></img>
              { !prodInfo.like ?
                <img className="PD-star" alt="찜하기" src={star_icon_line} onClick={() => starClick()}></img>
                : <img className="PD-star" alt="찜하기" src={star_icon_filled} onClick={() => starClick()}></img>
              }
            </div>
          </span>
          
          {/* 상품 정보 - 텍스트 */}
          <span className="PD-info_text">
            { prodInfo.sell_type !== 2 &&
              <div className="PD-period">
                {moment(prodInfo.start_date).format("YYYY-MM-DD HH:mm")} ~ {moment(prodInfo.end_date).format("YYYY-MM-DD HH:mm")}
              </div>
            }
            <div className="PD-company">{prodInfo.prod_com}</div>
            <div className="PD-name">{prodInfo.prod_name}</div>
            <div className="PD-price">
              { prodInfo.sell_type === 2 ? 
                <span className="PD-org_price_cancel">{prodInfo?.org_price?.toLocaleString('ko-KR')}원</span>
                : <span className="PD-price_text">
                    { state === 0 ? "경매시작가" : state === 1 ? "현재가" : "" }
                  </span>
              }
              <span className="PD-price_num">{prodInfo?.cur_price?.toLocaleString('ko-KR')}</span>
              <span className="PD-price_num_text">원</span>
            </div>

            <hr className="PD-info_line"></hr>
            
            <ul className="PD-main_info_text_wrap">
              <li className="PD-main_info_text">
                <span>상태</span>
                <span>{prodInfo.prod_grade}급</span>
                <img className="PD-main_info_icon" alt="상품 상태 상세정보" src={info_icon_brown} onClick={InfoIconClick("grade")}
                  onMouseEnter={() => setStateHovered(1)} onMouseLeave={() => setStateHovered(0)} />
                { stateHovered === 1 &&
                  ( prodInfo.prod_grade === "S" ?
                    <div className="PD-state_info">
                      - 사용하지 않았거나 미세한 사용감만 있는 상품<br/>
                      - 전시상품 등 신품에 가까운 상품<br/>
                    </div>
                  : prodInfo.prod_grade === "A" ?
                    <div className="PD-state_info">
                      - 생활 스크레치, 미세한 원단의 변색 등과 같은 약간의 사용 흔적이 있는 <br/>
                      - 전체적으로 사용감은 있으나 상처나 얼룩이 적은 상품
                    </div>
                   : <div className="PD-state_info">
                      - 눈에 띄는 스크레치나 원단의 변색 등과 같은 사용 흔적이 있는 상품<br/><br/>
                      - 사용감이 있고 상처나 얼룩이 다소 보이지만 심하지 않은 상품
                    </div> )
                }
              </li>
              { prodInfo.sell_type !== 2 && <>
                  <li className="PD-main_info_text">
                    <span>원가</span>
                    <span>{prodInfo?.org_price?.toLocaleString('ko-KR')}원</span>
                  </li>
                  <li className="PD-main_info_text">
                    <span>즉시구매가</span>
                    <span>{prodInfo?.direct_price?.toLocaleString('ko-KR')}원</span>
                  </li>
                  <li className="PD-main_info_text">
                    <span className="PD-main_info_text_gray">경매시작가</span>
                    <span className="PD-main_info_text_gray">{prodInfo?.auction_price?.toLocaleString('ko-KR')}원</span>
                  </li>
                </>
              }
              <li className="PD-main_info_text">
                <span>보증서유무</span>
                <span>{prodInfo?.guarantee === 0 ? "없음" : "있음"}</span>
              </li>
              <li className="PD-main_info_text">
                <span>A/S</span>
                <span>{prodInfo?.as_date === 0 ? `A/S 불가` : `구매 후 ${prodInfo.as_date}년`}</span>
              </li>
              <li className="PD-main_info_text">
                <span>배송설치비</span>
                <span>{prodInfo?.delivery_price === 0 ? "무료" : `${prodInfo?.delivery_price?.toLocaleString('ko-KR')}원`}</span>
                <img className="PD-main_info_icon" alt="배송설치비 상세정보" src={info_icon_brown} onClick={InfoIconClick("delivery")}
                  onMouseEnter={() => setStateHovered(2)} onMouseLeave={() => setStateHovered(0)} />
                { stateHovered === 2 &&
                  <div className="PD-deli_info">
                    설치가 필요한 제품의 경우 설치기사님께서 설치하며, 미리 연락 후 방문드립니다.<br/><br/>
                    설치/배송비 안내<br/>
                      - 기본 설치비용 이외에 추가금이 있을 경우 낙찰 후 개별로 안내드릴 예정이며, 추가 비용은 제품 상세페이지에서 확인하실 수 있습니다.<br/>
                      - 서울/경기 외 수도권, 지방 추가금 없음
                  </div>
                }
              </li>
            </ul>
            
            {/* 즉시구매/판매완료 버튼 */}
            { state === 0 ? 
                <div className="PD-buy_btn_gray">{moment(prodInfo.start_date).format("YYYY-MM-DD HH:mm")} 오픈 예정</div>
              : state === 2 ?
                <div className="PD-buy_btn_gray">판매종료</div>
              : prodInfo.sell_type === 2 &&
                <button className="PD-buy_btn_filled" type="button" onClick={directBuy}>구매하기</button>
            }

            {/* 시간/가격 정보 */}
            <hr className="PD-info_line"></hr>
            { prodInfo.sell_type !== 2 && state === 1 && <>
              <ul className="PD-price_info_wrap">
                {getDday()}
                <li className="PD-price_info_text">
                  <span>현재가</span>
                  <span className="PD-current_price_num">{prodInfo?.cur_price?.toLocaleString('ko-KR')}</span>
                  <span className="PD-current_price_text">원</span>
                </li>
                <li className="PD-price_info_text">
                  <span>
                    입찰가
                    <img className="PD-bid_info_icon" alt="입찰방법" src={info_icon_brown} onClick={InfoIconClick("bid_info")}
                     onMouseEnter={() => setStateHovered(3)} onMouseLeave={() => setStateHovered(0)} />
                     { stateHovered === 3 &&
                        <div className="PD_bid_info">
                          <br/>
                          자동 입찰<br/>
                            - 화살표를 클릭하여 원하시는 금액까지 미리 입찰금액을 설정(자동 입찰)할 수 있습니다.<br/>
                            - 입찰 한도액을 미리 설정해 자동으로 입찰이 진행되는 입찰 방식으로 상대 입찰자가 없으면 한도액 내 최소금액으로 낙찰됩니다.
                        </div>
                      }
                  </span>
                  <span className="PD-bid_price_wrap">
                    { bidPrice === prodInfo.cur_price + prodInfo.unit_price ? 
                      <span className="PD-bid_price_0_gray">&lt;</span>
                      : <button className="PD-bid_price_0" onClick={() => {bidPriceUpdate("minus")}}>&lt;</button>
                    }
                    <span className={bidPrice === prodInfo.cur_price + prodInfo.unit_price ? "PD-bid_price_none" : "PD-bid_price_1"}>
                      {bidPrice - prodInfo.unit_price}
                    </span>
                    <span className="PD-bid_price_2">{bidPrice} <span>원</span></span>
                    <span className={prodInfo.direct_price !== null && bidPrice === prodInfo.direct_price ? "PD-bid_price_none" : "PD-bid_price_3"}>
                      {bidPrice + prodInfo.unit_price}
                    </span>
                    <span className={prodInfo.direct_price !== null && bidPrice >= prodInfo.direct_price - prodInfo.unit_price ? "PD-bid_price_none" : "PD-bid_price_4"}>
                      {bidPrice + prodInfo.unit_price * 2}
                    </span>
                    { prodInfo.direct_price !== null && bidPrice === prodInfo.direct_price ? 
                      <span className="PD-bid_price_0_gray">&gt;</span>
                      : <button className="PD-bid_price_0" onClick={() => {bidPriceUpdate("plus")}}>&gt;</button>
                    }
                  </span>
                </li>
              </ul>

              {/* 구매/입찰 버튼 */}
              <div className="PD-buy_btn_wrap">
                { bidPrice !== prodInfo.direct_price &&
                  <button className="PD-buy_btn_filled" type="button" onClick={bidBuy}>입&nbsp;&nbsp;&nbsp;찰</button>
                }
                { prodInfo.sell_type === 3 &&
                  <button className="PD-buy_btn_line" type="button" onClick={directBuy}>
                    {prodInfo?.direct_price?.toLocaleString('ko-KR')}<span>원에</span> 즉시 구매<span>하기</span>
                  </button>
                }
              </div>

              <hr className="PD-info_line" />

              {/* 입찰 내역 */}
              <div className={!bidListState ? "PD-bid_list_wrap_closed" : "PD-bid_list_wrap"}>
                <div className="PD-bid_list_title_wrap">
                  <span className="PD-bid_list_title">
                    입찰내역&nbsp;
                    <span>{`(${countBid}건)`}</span>
                    <img className={!bidListState ? "PD-arrow_icon_closed" : "PD-arrow_icon"}
                      alt="입찰내역" src={arrow_icon_brown} onClick={bidListOut} />
                  </span>
                </div>
                { bidListState && ( countBid === 0 ?
                  <ul className="PD-bid_list">
                    <li className="PD-bid_list_line">
                      <div className="PD-bid_list_none">입찰 내역이 없습니다.</div>
                    </li>
                  </ul>
                  : <ul className="PD-bid_list">
                    {bidListMap}
                    <div ref={bidref} />
                  </ul>
                )}
              </div>

              <hr className="PD-info_line"></hr>
              </>
            }
              {/* 하자 정보 */}
              <div className="PD-defect_wrap">
                <div className="PD-defect_title_wrap">
                  <span className="PD-defect_title">하자정보</span>
                  <img className="PD-main_info_icon" alt="하자정보" src={info_icon_brown} onClick={InfoIconClick("DefectInfo")}
                  onMouseEnter={() => setStateHovered(4)} onMouseLeave={() => setStateHovered(0)} />
                  { stateHovered === 4 &&
                      <div className="PD_deffect_info">
                        사진은 실제와 차이가 있을 수 있습니다.<br/>
                        상품의 색상 및 상태는 모니터의 해상도에 따라 다소 차이가 날 수 있으며, 이로 인한 반품 및 환불은 불가합니다.
                      </div>
                  }
                </div>
                { login_id === null ? <div className="PD-defect_content_notlogin">로그인 후 확인 가능합니다</div>
                  : <>
                    <div className="PD-defect_content">{prodInfo.defect_text}</div>
                    {prodInfo.defect_image1 !== null &&
                      <div className="PD-defect_image_wrap">
                        <img className="PD-defect_image"
                          alt="하자이미지1" src={`/images/${prodInfo.defect_image1}`} onClick={() =>{imageViewChange(1)}}></img>
                        { prodInfo.defect_image2 === null ? <span className="PD-noImage">no<br/>image</span>
                          : <img className="PD-defect_image"
                              alt="하자이미지2" src={`/images/${prodInfo.defect_image2}`} onClick={() =>{imageViewChange(2)}}></img>
                        }
                        { prodInfo.defect_image3 === null ? <span className="PD-noImage">no<br/>image</span>
                          : <img className="PD-defect_image"
                              alt="하자이미지3" src={`/images/${prodInfo.defect_image2}`} onClick={() =>{imageViewChange(3)}}></img>
                        }
                      </div>
                    }
                    { imageView !== 0 &&
                      <div className="PD-defect_image_modal_wrap" onClick={() =>{imageViewChange(4)}}>
                        { imageView === 1 ?
                          <img className="PD-defect_image_modal"
                            alt="하자이미지1" src={`/images/${prodInfo.defect_image1}`} onClick={() =>{imageViewChange(1)}}></img>
                          : imageView === 2 ?
                          <img className="PD-defect_image_modal"
                            alt="하자이미지2" src={`/images/${prodInfo.defect_image2}`} onClick={() =>{imageViewChange(2)}}></img>
                          : imageView === 3 &&
                          <img className="PD-defect_image_modal"
                            alt="하자이미지3" src={`/images/${prodInfo.defect_image2}`} onClick={() =>{imageViewChange(3)}}></img>
                        }
                      </div>
                    }
                  </>
                }
              </div>
          </span>
      </div>

      {/* 상세정보, 상품문의, 결제 및 배송, 교환환불 */}
      <div className="PD-detail_info_wrap">
        <div className="PD-detail_info_menu">
          <span className={detailInfo === 1 ? "PD-detail_info_title_on" : "PD-detail_info_title"} onClick={() => {setDetailInfo(1)}}>상세정보</span>
          <span className={detailInfo === 2 ? "PD-detail_info_title_on" : "PD-detail_info_title"} onClick={() => {setDetailInfo(2)}}>상품문의</span>
          <span className={detailInfo === 3 ? "PD-detail_info_title_on" : "PD-detail_info_title"} onClick={() => {setDetailInfo(3)}}>결제 및 배송</span>
          <span className={detailInfo === 4 ? "PD-detail_info_title_on" : "PD-detail_info_title"} onClick={() => {setDetailInfo(4)}}>교환/환불</span>
        </div>
        <div className="PD-detail_info_content">
          { detailInfo === 1 ? <PostProdDetail detail_image={prodInfo.detail_image} />
            : detailInfo === 2 ? <ProdInquiry board_num={board_num} login_id={login_id}/>
            : <SellInfo detail_info={detailInfo} sell_type={prodInfo.sell_type} />
          }
        </div>
      </div>
    </div>
  );
}
export default PostDetail;
