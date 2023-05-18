// 판매 결제 페이지

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PostPay.css";
import PayInfo from "./PayInfo";
import search_icon from "../../images/search.png";
import postPayinfo from "./postPayInfo.json";
import userPayInfo from "./userPayInfo.json";


function PostPay() {
    const board_num = useParams().board_num;
    const sell_type = useParams().sell_type;
    const [payInfo, setPayInfo] = useState(postPayinfo); // 상품/판매 정보
    const [userInfo, setUserInfo] = useState(userPayInfo); // 회원 정보
    const [payCheck, setPayCheck] = useState("simple");
    const [payForm, setPayForm] = useState({ // 배송 정보 입력 폼
        name: "",
        phone: "",
        address : "",
        detail_address: "",
        recipt_req: ""
    });
    const [pay, setPay] = useState({ // 결제 정보
        coupon_num: 0,
        coupon_price: 0,
        mile: 0,
        buy_method: 0
    });

    useEffect (() => {
        // 결제 정보 조회
        // setPayInfo();
    }, []);

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
                recipt_req: ""  
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
                recipt_req: e.target.value
            }));
        } else if (e.target.id === "pay_mile") {
            setPay((prevPay) => ({
                ...prevPay,
                mile: e.target.value
            }));
        }
    }

    // 주소 찾기
    const searchAdd = () => {

    }

    // 쿠폰 선택
    const couponChoice = () => {

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
                                <img className="PP-search_icon" alt="주소 검색" src={search_icon} onClick={searchAdd} />
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
                                value={payForm.recipt_req} onChange={handleForm} placeholder="요청사항을 입력하세요" />
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
                        <button className="PP-pay_coupon_button" onClick={couponChoice}>쿠폰 선택</button>
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

            {/* 결제 수단 선택 */}
            <div className="PP-pay_wrap">
                <div className="PP-pay_top">
                    <div className="PP-user_info_title">결제수단</div>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_card" value="card" />
                        <label htmlFor="pay_card">신용/체크</label>
                    </span>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_simple" value="simple" />
                        <label htmlFor="pay_simple">간편결제</label>
                    </span>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_phone" value="phone" />
                        <label htmlFor="pay_phone">휴대폰결제</label>
                    </span>
                    <span className="PP-pay_radio">
                        <input type="radio" name="pay" id="pay_account" value="account" />
                        <label htmlFor="account">계좌이체</label>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostPay;
