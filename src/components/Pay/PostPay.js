// 판매 결제 페이지

import "./PostPay.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import PortonePay from "./PortonePay";
import PayInfo from "./PayInfo";
import search_icon from "../../images/search.png";
import CouponFind from "./CouponlList";

function PostPay() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("id") === null || board_num === null || sell_type === null) navigate(-1);
    }, [])

    const board_num = useParams().board_num;
    const location = useLocation();
    const sell_type = new URLSearchParams(location.search).get('sell_type');
    const [pay_num, setPay_num] = useState();
    const [payInfo, setPayInfo] = useState({ // 상품/판매 정보
        delivery_price: 0,
        price: 0
    });
    const [userInfo, setUserInfo] = useState({ // 회원 정보
        mile: 0
    });
    const [totalPrice, setTotalPrice] = useState(0); // 총 결제 금액
    const [payForm, setPayForm] = useState({ // 배송 정보 입력 폼
        name: "",
        phone: "",
        email: "",
        address : "",
        detail_address: "",
        receipt_req: ""
    });
    const [pay, setPay] = useState({ // 결제 정보
        mile: 0,
        coupon_num:0,
        coupon_price:0,
        buy_method: "card" // 결제수단 : 카드 card, 계좌이체 trans, 휴대폰결제 phone
    });

    const [Modal, setModal] = useState(false); // 쿠폰 찾기 모달

    useEffect (() => {
        // 결제 정보 조회
        axios
            .get(`/pay/info?board_num=${board_num}&sell_type=${sell_type}`)
            .then((res) => {
                setPayInfo(res.data);
                setPay_num(moment(new Date()).format("YYMMDDHHmmss") + "-" + res.data.category_code + res.data.product_code);
            })
            .catch((e) => {
                // console.error(e);
            });
        axios
            .post("/pay/user", { memberId: sessionStorage.getItem("id") })
            .then((res) => {
                setUserInfo(res.data);
                
            })
            .catch((e) => {
                // console.error(e);
            });
    }, []);

    useEffect(() => {
        setTotalPrice(payInfo.price + payInfo.delivery_price - pay.coupon_price - pay.mile);
    }, [payInfo, pay.coupon_price, pay.mile])

    // 배송 정보 동기화
    const deliSynchChange = (e) => {
        if (e.target.checked) {
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                name: userInfo.name,
                phone: userInfo.phone,
                address: userInfo.address,
                detail_address: userInfo.detail_address
            }));
        } else {
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                name: "",
                phone: "",
                address : "",
                detail_address: "",
                receipt_req: ""
            }));
        }
    };

    // 배송 정보 입력
    const handleForm = (e) => {
        if (e.target.id === "pay_name") { // 수령인 이름
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                name: e.target.value
            }));
        } else if (e.target.id === "pay_phone") { // 수령인 연락처
            const onlyNum = e.target.value.replace(/[^\d]/g, ''); // 숫자 이외의 문자 모두 제거
            const phoneNum = onlyNum.length < 4 ? onlyNum
                : onlyNum.length < 7 ? onlyNum.substr(0, 3) + '-' + onlyNum.substr(3)
                : onlyNum.length < 11 ? onlyNum.substr(0, 3) + '-' + onlyNum.substr(3, 3) + '-' + onlyNum.substr(6)
                : onlyNum.substr(0, 3) + '-' + onlyNum.substr(3, 4) + '-' + onlyNum.substr(7);
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                phone: phoneNum
            }));
        } else if (e.target.id === "pay_add") { // 배송지 주소

        } else if (e.target.id === "pay_add_detail") { // 배송지 상세주소
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                detail_address: e.target.value
            }));
        } else if (e.target.id === "pay_req") { // 배송 요청사항
            setPayForm((prevPayForm) => ({
                ...prevPayForm,
                receipt_req: e.target.value
            }));
        } else if (e.target.id === "pay_mile") { // 마일리지
            if (e.target.value <= userInfo.mile) {
                setPay((prevPay) => ({
                    ...prevPay,
                    mile: e.target.value
                }));
            }
        } else if (e.target.name === "pay") { // 결제수단
            setPay((prevPay) => ({
                ...prevPay,
                buy_method: e.target.value
            }));
        }
    }

    // 주소 찾기 (카카오 API)
    useEffect(() => {
        const loadDaumPostcodeScript = () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        };
    
        const initializeDaumPostcode = () => {
          if (window.daum && window.daum.Postcode) {
            window.searchAdd = () => {
              new window.daum.Postcode({
                oncomplete: function (data) {
                    console.log(data.address);
                    setPayForm((prevPayForm) => ({ ...prevPayForm, address: data.address }));
                }
              }).open();
            };
          }
        };
    
        loadDaumPostcodeScript().then(initializeDaumPostcode);
    }, []);
    useEffect(() => {
        if (payForm.address !== userInfo.address) {
            setPayForm((prevPayForm) => ({ ...prevPayForm, detail_address: "" }));
        }
    }, [payForm.address]);

    // 쿠폰 선택
    const couponChoice = () => {
        
    }

    // 결제 취소
    const payCancel = () => {
        sell_type === 1 ? navigate(`/mypage/bidlist`)
        : navigate(`/post/detail/${board_num}`);
    }


    return (
        <div className="PP-_wrap">
            <div className="PP-title">
                주문/결제
                <span className="PP-code">{payInfo.category_code}-{payInfo.product_code}</span>
            </div>
            <hr className="PP-main_line" />

            {/* 회원 정보 */}
            <PayInfo prod={payInfo} />

            {/* 배송 정보 */}
            <div className="PP-user_info_wrap">
                <span className="PP-user_info">
                    <div className="PP-user_info_title">구매자 정보</div>
                    <div className="PP-user_info_text">{userInfo.name}</div>
                    <div className="PP-user_info_text">{userInfo.phone}</div>
                    <div className="PP-user_info_text">{userInfo.email}</div>
                </span>
                <span className="PP-delivery_wrap">
                    <div className="PP-info_title_wrap">
                        <span className="PP-info_title">배송지 정보</span>
                        <span className="PP-info_checkbox">
                            <input type="checkbox" id="user_info_synch" onChange={deliSynchChange} />
                            <label htmlFor="user_info_synch">구매자 정보와 동일</label>
                        </span>
                    </div>
                    <span className="PP-form_left">
                        <div className="PP-form">
                            <label htmlFor="pay_name">수령인</label>
                            <input type="text" id="pay_name" name="pay_name" maxLength="10" 
                                value={payForm.name} onChange={handleForm} placeholder="이름" required />
                        </div>
                        <div className="PP-form">
                            <label htmlFor="pay_phone">연락처</label>
                            <input type="text" id="pay_phone" name="pay_phone" maxLength="15" 
                                value={payForm.phone} onChange={handleForm} placeholder="연락처" required />
                        </div>
                    </span>
                    <span className="PP-form_right">
                        <div className="PP-form">
                            <label htmlFor="pay_add">주소</label>
                            <div className="PP-form_search_wrap">
                                <input type="text" id="pay_add" name="pay_add" maxLength="50" 
                                    value={payForm.address} onChange={handleForm} placeholder="주소" disabled required />
                                <img className="PP-search_icon" alt="주소 검색" src={search_icon} onClick={window.searchAdd} />
                            </div>
                        </div>
                        <div className="PP-form">
                            <div className="PP-form_wrap">
                                <input type="text" id="pay_add_detail" name="pay_add_detail" maxLength="50" 
                                    value={payForm.detail_address} onChange={handleForm} placeholder="상세주소"
                                    disabled={payForm.address === ""} required />
                            </div>
                        </div>
                    </span>
                    <div className="PP-form_bottom">
                        <div className="PP-form">
                            <label htmlFor="pay_req">배송 요청사항</label>
                            <input type="text" id="pay_req" name="pay_req" maxLength="50" 
                                value={payForm.receipt_req} onChange={handleForm} placeholder="요청사항을 입력하세요" />
                        </div>
                    </div>
                </span>
            </div>

            {/* 쿠폰, 마일리지 사용 */}
            <div className="PP-pay_user_wrap">
                <div className="PP-user_info_title">쿠폰 및 마일리지</div>
                <div className="PP-pay_user">
                    <span className="PP-pay_coupon_wrap">
                        <span className="PP-pay_user_title">쿠폰 사용</span>
                        <span className="PP-pay_user_use">{pay.coupon_price.toLocaleString('ko-KR')}&nbsp;원</span>
                        <button className="PP-pay_coupon_button" onClick={() => {setModal(true)}}>쿠폰 선택</button>
                    </span>
                    <span className="PP-pay_mile_wrap">
                        <label className="PP-pay_user_title" htmlFor="pay_mile">마일리지 사용</label>
                        <span className="PP-pay_mile">
                            <input className="PP-pay_user_use" type="number" id="pay_mile" name="pay_mile"
                                value={pay.mile === 0 ? '' : pay.mile} onChange={handleForm} placeholder="0" required />
                            <span className="PP-pay_mile_text">원</span>
                        </span>
                        <span className="PP-pay_user_mile">{userInfo.mile.toLocaleString('ko-KR')}원 사용 가능</span>
                    </span>
                </div>
            </div>
            {/*쿠폰 모달*/}
            {Modal &&
                <div className="Coupon_modal_overlay">
                    <div className="Coupon_modal">
                        <CouponFind id={sessionStorage.getItem("id")}pay={pay} state={1} setPay={setPay} setModal={setModal} />
                    </div>
                </div>
            }
            {/* 결제 수단 선택 */}
            <div className="PP-pay_wrap">
                <div className="PP-pay_top">
                    <div className="PP-user_info_title">결제수단</div>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_method_card" value="card"
                            checked={pay.buy_method === "card"} onChange={(e) => handleForm(e)} />
                        <label htmlFor="pay_method_card">신용/체크</label>
                    </span>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_method_phone" value="phone"
                            checked={pay.buy_method === "phone"} onChange={(e) => handleForm(e)} />
                        <label htmlFor="pay_method_phone">휴대폰결제</label>
                    </span>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_method_trans" value="trans"
                            checked={pay.buy_method === "trans"} onChange={(e) => handleForm(e)} />
                        <label htmlFor="pay_method_trans">계좌이체</label>
                    </span>
                </div>
            </div>

            {/* 총 결제 가격 */}
            <div className="PP-pay_price_wrap">
                <div className="PP-pay_price_detail_wrap">
                    <div className="PP-pay_price_detail_line">
                        <span className="PP-price_detail_text">상품금액</span>
                        <span className="PP-price_detail_price">{payInfo.price.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="PP-pay_price_detail_line">
                        <span className="PP-price_detail_text">배송설치비</span>
                        <span className="PP-price_detail_price">{payInfo.delivery_price.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="PP-pay_price_detail_line">
                        <span className="PP-price_detail_text">할인금액</span>
                        <span className="PP-price_detail_price">
                            {(parseInt(pay.coupon_price, 10) + (pay.mile !== "" ? parseInt(pay.mile, 10) : 0)).toLocaleString('ko-KR')}원
                        </span>
                    </div>
                </div>
                <div className="PP-pay_total_price_wrap">
                    <div className="PP-pay_total_price_text">총 결제금액</div>
                    <div className="PP-pay_total_price">{totalPrice.toLocaleString('ko-KR')}원</div>
                </div>
            </div>

            {/* 결제하기 (포트원 API) */}
            <div className="PP-pay_btn_wrap">
                <PortonePay payInfo={payInfo} payForm={payForm} pay={pay} board_num={board_num} pay_num={pay_num} totalPrice={totalPrice} />
            </div>
            <div className="PP-pay_cancel_btn" onClick={() => {payCancel()}}>취소</div>
        </div>
    );
};

export default PostPay;
