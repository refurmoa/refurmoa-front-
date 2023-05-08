// 판매 상세 페이지

import "./PostDetail.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostProdDetail from "./PostProdDetail";
import ProdInquiry from "./ProdInquiry";
import SellInfo from "./SellInfo";
import star_icon_filled from "../../../images/star_icon_filled-240.png";
import star_icon_line from "../../../images/star_icon_line-240.png";
import info_icon_brown from "../../../images/info_icon_brown-240.png";
import arrow_icon_brown from "../../../images/arrow_icon_brown-240.png";
import post from "./post.json";
import bidlist from "./bidlist.json";

function PostDetail() {
  const board_num = useParams().board_num;
  const navigate = useNavigate();
  // const login_id = window.sessionStorage.getItem("member_id"); // 세션 ID
  const [prodInfo, setProdInfo] = useState(post);
  const [bidList, setBidList] = useState(bidlist);
  const [state, setState] = useState(0);
  const [starState, setStarState] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [countBid, setCountBid] = useState(0);
  const [bidListState, setBidListState] = useState(0);
  const [detailInfo, setDetailInfo] = useState(1);
  const login_id = "admin";

  // sell_type => 1 : 경매, 2 : 즉시구매, 3 : 경매+즉시구매

  useEffect (() => {
    // 상품 정보
    // setProdInfo();

    // 판매 상태(state) (0 : 판매예정, 1 : 판매중, 2 : 판매종료)
    const start = new Date(prodInfo.start_date);
    const end = new Date(prodInfo.end_date);
    const today = new Date();
    const startDay = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
    const endDay = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    setState(endDay < 1 ? 2 : startDay < 1 ? 1 : 0);

    // 찜 상태
    login_id !== null && prodStar();

    // 입찰가
    setBidPrice(prodInfo.cur_price + prodInfo.unit_price);

    // 입찰 내역 조회
    // setBidList();

    // 입찰 수 조회
    prodInfo.sell_type !== 2 && setCountBid(7);
  }, []);

  // 타이머 시작
  


  // 타이머 끝

  // 삭제
  const postDelete = () => {
    const deleteQ = window.confirm("정말 삭제하시겠습니까?");
    if (deleteQ) {
      
    }
  };

  // 찜 조회 (0 : 찜X, 1 : 찜O)
  const prodStar = () => {
    // setStarState(1);
  };

  // 찜 등록/취소
  const starClick = () => {
    if (login_id === null) {
      navigate("/login");
    } else {
      starState === 0 ? setStarState(1) : setStarState(0);
    }
  };

  // 상품 설명 상세 정보 (상태 : grade, 배송설치비 : delivery, 입찰가 : bid_info, 하자정보 : DeffectInfo)
  const InfoIconClick = (content) => {
    // content === "grade" ?  : content === "delivery" ?  : ;
  }

  // 입찰가 설정 (minus / plus)
  const bidPriceUpdate = (c) => {
    // let updatePrice = bidPrice;
    // c === "minus" ? updatePrice = bidPrice - prodInfo.unit_price
    // : updatePrice = bidPrice + prodInfo.unit_price
    // setBidPrice(0);
  }

  // 입찰
  const bidBuy = () => {
    
  }

  // 즉시구매
  const directBuy = () => {
    if (login_id === null) {
      navigate("/login");
    } else {
      navigate("/pay/$", {
        member_id: login_id,
        board_num: board_num,
        product_code: prodInfo.product_code,
        sell_type: prodInfo.sell_type,
        direct_price: prodInfo.direct_price
      })
    }
  };

  // 입찰내역 열기/닫기
  const bidListOut = () => {
      bidListState === 1 ? setBidListState(0)
      : login_id === null ? alert("로그인 후 확인 가능합니다.")
      : setBidListState(1);
  }

  // 입찰내역
  const bidListMap = bidList.map((li) => (
    <li className="PD-bid_list_line" key={li.bid_num}>
      <span className="PD-bid_list_id">
        { login_id === "admin" || login_id === li.member_id ? li.member_id
          : li.member_id.slice(0, 2) + "*".repeat(li.member_id.length-2)
        }
        { li.bid_auto === 1 &&
          <span className="PD-bid_list_auto"> [자동]</span>
        }
      </span>
      <span className="PD-bid_list_price">{li.bid_price.toLocaleString('ko-KR')}원</span>
      <span className="PD-bid_list_date">{li.bid_date}</span>
    </li>
  ));

  // 이미지 모달 창
  const imageView = () => {

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
        {login_id === "admin" && (
          <span className="PD_update_delete">
            <Link to={`/post/update/${board_num}`}>수정</Link>
            <span>|</span>
            <span onClick={postDelete}>삭제</span>
          </span>
        )}
      </div>

      <div className="PD-info_wrap">
          {/* 상품 정보 - 메인 이미지 */}
          <span className="PD-main_image_wrap">
            <div className="PD-star_position">
            <img className="PD-main_image" alt="상품이미지" src={`/images/${prodInfo.main_image}`}></img>
              { starState === 0 ?
                <img className="PD-star" alt="찜하기" src={star_icon_line} onClick={starClick}></img>
                : <img className="PD-star" alt="찜하기" src={star_icon_filled} onClick={starClick}></img>
              }
            </div>
          </span>
          
          {/* 상품 정보 - 텍스트 */}
          <span className="PD-info_text">
            { prodInfo.sell_type !== 2 &&
              <div className="PD-period">
                {prodInfo.start_date} ~ {prodInfo.end_date}
              </div>
            }
            <div className="PD-company">{prodInfo.prod_com}</div>
            <div className="PD-name">{prodInfo.prod_name}</div>
            <div className="PD-price">
              { prodInfo.sell_type === 2 ? 
                <span className="PD-org_price_cancel">{prodInfo.org_price.toLocaleString('ko-KR')}원</span>
                : <span className="PD-price_text">
                    { state === 0 ? "경매시작가" : state === 1 ? "현재가" : "" }
                  </span>
              }
              <span className="PD-price_num">{prodInfo.cur_price.toLocaleString('ko-KR')}</span>
              <span className="PD-price_num_text">원</span>
            </div>

            <hr className="PD-info_line"></hr>
            
            <ul className="PD-main_info_text_wrap">
              <li className="PD-main_info_text">
                <span>상태</span>
                <span>{prodInfo.prod_grade}</span>
                <img className="PD-main_info_icon" alt="상품 상태 상세정보" src={info_icon_brown} onClick={InfoIconClick("grade")}></img>
              </li>
              { prodInfo.sell_type !== 2 && <>
                  <li className="PD-main_info_text">
                    <span>원가</span>
                    <span>{prodInfo.org_price.toLocaleString('ko-KR')}원</span>
                  </li>
                  <li className="PD-main_info_text">
                    <span>즉시구매가</span>
                    <span>{prodInfo.direct_price.toLocaleString('ko-KR')}원</span>
                  </li>
                  <li className="PD-main_info_text">
                    <span className="PD-main_info_text_gray">경매시작가</span>
                    <span className="PD-main_info_text_gray">{prodInfo.auction_price.toLocaleString('ko-KR')}원</span>
                  </li>
                </>
              }
              <li className="PD-main_info_text">
                <span>보증서유무</span>
                <span>{prodInfo.guarantee === 0 ? "없음" : "있음"}</span>
              </li>
              <li className="PD-main_info_text">
                <span>A/S</span>
                <span>{prodInfo.as_date === 0 ? `A/S 불가` : `구매 후 ${prodInfo.as_date}년`}</span>
              </li>
              <li className="PD-main_info_text">
                <span>배송설치비</span>
                <span>{prodInfo.delivery_price === 0 ? `무료` : `${prodInfo.delivery_price.toLocaleString('ko-KR')}원`}</span>
                <img className="PD-main_info_icon" alt="배송설치비 상세정보" src={info_icon_brown} onClick={InfoIconClick("delivery")}></img>
              </li>
            </ul>
            
            {/* 즉시구매/판매완료 버튼 */}
            { state === 0 ? 
                <div className="PD-buy_btn_gray">{prodInfo.start_date} 오픈 예정</div>
              : state === 2 ?
                <div className="PD-buy_btn_gray">판매종료</div>
              : prodInfo.sell_type === 2 &&
                <button className="PD-buy_btn_filled" type="button" onClick={directBuy}>구매하기</button>
            }

            {/* 시간/가격 정보 */}
            <hr className="PD-info_line"></hr>
            { prodInfo.sell_type !== 2 && state === 1 && <>
              <ul className="PD-price_info_wrap">
                <li className="PD-price_info_text">
                  <span>남은시간</span>
                  <span className="PD-timer_num">00</span>
                  <span className="PD-timer_text">일&nbsp;</span>
                  <span className="PD-timer_num"> 00</span>
                  <span className="PD-timer_text">시간&nbsp;</span>
                  <span className="PD-timer_num"> 00</span>
                  <span className="PD-timer_text">분&nbsp;</span>
                  <span className="PD-timer_num"> 00</span>
                  <span className="PD-timer_text">초</span>
                </li>
                <li className="PD-price_info_text">
                  <span>현재가</span>
                  <span className="PD-current_price_num">{prodInfo.cur_price.toLocaleString('ko-KR')}</span>
                  <span className="PD-current_price_text">원</span>
                </li>
                <li className="PD-price_info_text">
                  <span>
                    입찰가
                    <img className="PD-bid_info_icon" alt="입찰방법" src={info_icon_brown} onClick={InfoIconClick("bid_info")}></img>
                  </span>
                  <span className="PD-bid_price_wrap">
                    <span className="PD-bid_price_0" onClick={bidPriceUpdate("minus")}>&lt;</span>
                    <span className="PD-bid_price_1">{bidPrice - prodInfo.unit_price}</span>
                    <span className="PD-bid_price_2">{bidPrice} <span>원</span></span>
                    <span className="PD-bid_price_3">{bidPrice + prodInfo.unit_price}</span>
                    <span className="PD-bid_price_4">{bidPrice + prodInfo.unit_price * 2}</span>
                    <span className="PD-bid_price_0" onClick={bidPriceUpdate("plus")}>&gt;</span>
                  </span>
                </li>
              </ul>

              {/* 구매/입찰 버튼 */}
              <div className="PD-buy_btn_wrap">
                <button className="PD-buy_btn_filled" type="button" onClick={bidBuy}>입&nbsp;&nbsp;&nbsp;찰</button>
                { prodInfo.sell_type === 3 &&
                  <button className="PD-buy_btn_line" type="button" onClick={directBuy}>
                    {prodInfo.direct_price.toLocaleString('ko-KR')}<span>원에</span> 즉시 구매<span>하기</span>
                  </button>
                }
              </div>

              <hr className="PD-info_line"></hr>

              {/* 입찰 내역 */}
              <div className={bidListState === 0 ? "PD-bid_list_wrap_closed" : "PD-bid_list_wrap"}>
                <div className="PD-bid_list_title_wrap">
                  <span className="PD-bid_list_title">
                    입찰내역&nbsp;
                    <span>{`(${countBid}건)`}</span>
                    <img className={bidListState === 0 ? "PD-arrow_icon_closed" : "PD-arrow_icon"}
                      alt="입찰내역" src={arrow_icon_brown} onClick={bidListOut}></img>
                  </span>
                </div>
                { bidListState === 1 &&
                  <ul className="PD-bid_list">
                    {bidListMap}
                  </ul>
                }
              </div>

              <hr className="PD-info_line"></hr>

              {/* 하자 정보 */}
              <div className="PD-deffect_wrap">
                <div className="PD-deffect_title_wrap">
                  <span className="PD-deffect_title">하자정보</span>
                  <img className="PD-main_info_icon" alt="하자정보" src={info_icon_brown} onClick={InfoIconClick("DeffectInfo")}></img>
                </div>
                { login_id === null ? <div className="PD-deffect_content_notlogin">로그인 후 확인 가능합니다</div>
                  : <>
                    <div className="PD-deffect_content">{prodInfo.deffect_text}</div>
                    {prodInfo.deffect_image1 !== null &&
                      <div className="PD-deffect_image_wrap">
                        { <img className="PD-deffect_image"
                            alt="하자이미지1" src={`/images/${prodInfo.deffect_image1}`} onClick={imageView(1)}></img>
                        }
                        { prodInfo.deffect_image2 === null ? <span className="PD-noImage">no<br/>image</span>
                          : <img className="PD-deffect_image"
                              alt="하자이미지2" src={`/images/${prodInfo.deffect_image2}`} onClick={imageView(2)}></img>
                        }
                        { prodInfo.deffect_image3 === null ? <span className="PD-noImage">no<br/>image</span>
                          : <img className="PD-deffect_image"
                              alt="하자이미지3" src={`/images/${prodInfo.deffect_image2}`} onClick={imageView(3)}></img>
                        }
                      </div>
                    }
                  </>
                }
              </div>
              </>
            }
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
