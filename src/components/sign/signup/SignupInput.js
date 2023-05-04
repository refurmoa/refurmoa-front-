import React from "react";
import "./Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Post from "./FindAddress";
import Modal from "react-modal";
const Signup_input = () => {
  const name = window.sessionStorage.getItem("name");
  const phone = window.sessionStorage.getItem("phone");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [birth, setBirth] = useState("");
  const [card_num, setCard_num] = useState("");
  const [valid_date, setValid_date] = useState("");
  const [cvc, setCvc] = useState("");
  const [card_pw, setCard_pw] = useState("");
  const [card_pw1, setCard_pw1] = useState("");
  const [card_pw2, setCard_pw2] = useState("");

  const [chkPWmsg, setchkPWmsg] = useState("");
  const [chkIdmsg, setChkIdmsg] = useState("");
  const [chkEmailmsg, setChkEmailmsg] = useState("");
  const [PWmsg, setPWmsg] = useState("");

  const [Is_pw, setIs_pw] = useState(false);
  const [check_pw, setCheck_pw] = useState(false);
  const [check_id, setCheck_id] = useState(false);
  const [check_Email, setCheck_Email] = useState(false);
  const [check_box, setCheck_box] = useState(false);

  /*========================== */
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const ChangePopUP = () => {
    setPopup(true);
    setModal(true);
  };
  const close_modal = () => {
    setPopup(false);
    setModal(false);
  };
  /*========================== */
  const IDcheck = () => {
    if (check_id) {
      alert("O");
      /*
        axios
        .post("/checkid", {
          id: id.current.value,
        })
        .then((res) => {
          if (res.data === 1) {
            alert("중복된 아이디 입니다.");
            setId("");
            return false;
          } else {
            alert("사용 가능한 아이디 입니다!");
          }
        })
        .catch((e) => {
          console.error(e);
        });*/
    } else {
      alert("X");
    }
  };
  const onClick = () => {
    if (check_pw && check_id && check_Email && check_box && Is_pw) {
      alert("다음으로 넘어가시겠습니까?");
      setEmail(email.concat("@", domain));
      setCard_pw(card_pw1.concat(card_pw2));
      /*
         axios
        .post("/signup", {
          id: id,
          password:password,
          email:email,
          address:address
          address_detail:address_detail
          birth:birth
        })
        .then((res) => {
          if(cardnum!==""){
             axios
              .post("/signup", {
                id: id,
                card_num:card_num,
                valid_date:valid_date,
                cvc:cvc
                card_pw:card_pw
              })
              .then((res) => {

              })
              .catch((e) => {
                console.error(e);
              });
          }
         
        })
        .catch((e) => {
          console.error(e);
        });


      */
      document.location.href = "/signup/4";
    }
    if (!check_pw) {
      alert("비밀번호를 입력해주세요!");
      return false;
    }
    if (!check_id) {
      alert("아이디를 입력해주세요!");
      return false;
    }
    if (!check_Email) {
      alert("이메일을 입력해주세요!");
      return false;
    }
    if (!check_box) {
      alert("개인 정보 동의를 체크해주세요!");
      return false;
    }
    console.log({ valid_date });
    window.sessionStorage.setItem("id", id);
  };
  const onIdCHK = (e) => {
    setId(e.target.value);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (id === "") {
      setChkIdmsg("아이디 입력은 필수입니다!");
      setCheck_id(false);
    } else if (!idRegExp.test(id)) {
      setChkIdmsg("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setCheck_id(false);
    } else {
      setChkIdmsg("올바른 아이디 형식입니다 :)");
      setCheck_id(true);
    }
  };
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPWmsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIs_pw(false);
    } else {
      setPWmsg("안전한 비밀번호에요 : )");
      setIs_pw(true);
    }
  };
  const onPwCHK = (e) => {
    setPasswordChk(e.target.value);
    if (password === e.target.value) {
      setchkPWmsg("비밀번호가 일치합니다!");
      setCheck_pw(true);
    } else {
      setchkPWmsg("비밀번호가 일치하지 않습니다!");
      setCheck_pw(false);
    }
  };
  const onEmailCHK = (e) => {
    setDomain(e.target.value);
    if (email === "" || e.target.value === "") {
      setChkEmailmsg("Email 정보를 모두 입력해주세요!");
      setCheck_Email(false);
    } else {
      setChkEmailmsg("");
      setCheck_Email(true);
    }
  };
  const onCHKbox = (e) => {
    if (e.target.checked) {
      setCheck_box(true);
    } else {
      setCheck_box(false);
    }
  };
  return (
    <>
      <form className="SU_input_form">
        <div className="SU_Main_header">회원가입</div>
        <div className="SU_sub_header">
          01 본인인증 &nbsp;&nbsp;
          <n className="SU_pro_now">02 정보입력</n>
          &nbsp;&nbsp; 03 약관동의 &nbsp;&nbsp; 04 가입완료
        </div>
        <div className="form_wrap">
          <table className="SU_input_table">
            <tr>
              <td>이름</td>
              <td className="prev_value">{name}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td className="prev_value">{phone}</td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                <input
                  className="address_input"
                  name="id"
                  type="text"
                  placeholder="아이디"
                  value={id}
                  onChange={onIdCHK}
                />
                <button className="SU_find_address" onClick={IDcheck}>
                  중복확인
                </button>
                <hr className="SU_input_line" />
                {check_id ? (
                  <span className="SU_ok_chk">{chkIdmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkIdmsg}</span>
                )}
              </td>
            </tr>

            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={onChangePassword}
                />
                <hr className="SU_input_line" />
                {Is_pw ? (
                  <span className="SU_ok_chk">{PWmsg}</span>
                ) : (
                  <span className="SU_not_chk">{PWmsg}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input
                  name="passwordChk"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordChk}
                  onChange={onPwCHK}
                />

                <hr className="SU_input_line" />
                {password !== "" && password === passwordChk ? (
                  <span className="SU_ok_chk">{chkPWmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkPWmsg}</span>
                )}
              </td>
            </tr>

            <tr>
              <td>이메일</td>
              <td>
                <input
                  className="email_input"
                  name="email"
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                @ &nbsp;
                <input
                  className="email_input"
                  name="domain"
                  id="domain-txt"
                  type="text"
                  placeholder="직접 입력"
                  value={domain}
                  onChange={onEmailCHK}
                />
                <select
                  class="box"
                  id="domain-list"
                  name="domain"
                  onChange={onEmailCHK}
                >
                  <option value={domain}>직접 입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="kakao.com">kakao.com</option>
                </select>
                <hr className="SU_input_line" />
                {check_Email ? (
                  <span className="SU_ok_chk">{chkEmailmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkEmailmsg}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>주소</td>
              <td>
                <input
                  className="address_input"
                  name="address"
                  type="text"
                  size="100"
                  placeholder="주소"
                  value={address}
                  required={true}
                />
                <button className="SU_find_address" onClick={ChangePopUP}>
                  주소찾기
                </button>
                <Modal
                  style={{
                    overlay: {
                      position: "fixed",

                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                    },
                    content: {
                      position: "absolute",
                      top: "40px",
                      width: "450px",
                      height: "430px",
                      left: "40px",
                      right: "40px",
                      bottom: "40px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "4px",
                      outline: "none",
                      padding: "20px",
                    },
                  }}
                  isOpen={modal}
                >
                  <div className="close_modal">
                    <button onClick={close_modal}>
                      <b>X</b>
                    </button>
                  </div>
                  <div>
                    {popup && (
                      <Post
                        address={address}
                        setAddress={setAddress}
                        setMdoal={setModal}
                      ></Post>
                    )}
                  </div>
                </Modal>
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input
                  name="address_detail"
                  type="text"
                  placeholder="상세 주소"
                  value={address_detail}
                  onChange={(e) => setAddress_detail(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>생년월일</td>
              <td>
                <input
                  name="birth"
                  type="date"
                  size="100"
                  placeholder="생년월일"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
          </table>
        </div>

        <div className="SU_card_header">결제수단 추가</div>
        <div className="SU_card_sub">카드 등록</div>
        <div className="form_wrap">
          <table className="SU_input_table">
            <tr>
              <td>
                <b>카드번호</b>
              </td>
              <td>
                <input
                  name="card_num"
                  type="text"
                  maxlength="16"
                  placeholder="0000-0000-0000-0000"
                  value={card_num}
                  onChange={(e) => setCard_num(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>
                <b>유효기간</b>
              </td>
              <td>
                <input
                  name="valid_date"
                  type="month"
                  placeholder="0000-0000-0000-0000"
                  value={valid_date}
                  onChange={(e) => setValid_date(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>
                <b>CVC</b>
              </td>
              <td>
                <input
                  name="cvc"
                  type="text"
                  placeholder="카드 뒷면 3자리 숫자"
                  value={cvc}
                  maxlength="3"
                  onChange={(e) => setCvc(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>
                <b>카드 비밀번호</b>
              </td>
              <td>
                <input
                  className="card_pw"
                  name="card_pw1"
                  type="password"
                  placeholder="*"
                  maxlength="1"
                  value={card_pw1}
                  onChange={(e) => setCard_pw1(e.target.value)}
                />
                <input
                  className="card_pw"
                  name="card_pw2"
                  type="password"
                  placeholder="*"
                  maxlength="1"
                  value={card_pw2}
                  onChange={(e) => setCard_pw2(e.target.value)}
                />
                *&nbsp;*
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="accept">
                <input type="checkbox" className="accept" onClick={onCHKbox} />
                개인(신용)정보 수집 및 이용 동의
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea className="terms">
                  리퍼모아(주)는 「개인정보보호법」 제15조 및 제22조, 제24조,
                  「신용정보의 이용 및 보호에 관한 법률」 제33조 및 제34조에
                  따라 귀하의 개인(신용)정보를 수집ㆍ이용하고자 합니다.
                  ①수집ㆍ이용 목적 서비스의 등록, 제공, 유지, 관리, 개선 서비스
                  분석을 위한 자료 활용, 전화 상담, 민원 분쟁 해결, 법령상 의무
                  이행 본인 여부 확인, 부정사용 예방 및 조사 관리 서비스 이용
                  내역 및 관련 서비스 확인 ② 수집ㆍ이용할 정보의 내용 개인식별
                  정보 : 성명, 생년월일, 성별, 내외국인구분, CI, 휴대폰번호,
                  이메일(E-mail), 비씨카드 웹회원 아이디(ID)/비밀번호(PASSWORD),
                  직장명, 부서명, 연락처(직장, 자택), 주소(직장, 자택) 결제정보
                  : 결제시간, 카드사구분, 발행사구분, 구입상품, 결제금액,
                  할부(할부여부,할부개월수) 접속 관련 정보 : IP주소, 웹브라우저
                  정보, OS 정보, 방문일시, 접속로그, 개인방화벽 설정, 운영체계
                  보안패치 여부, 쿠키정보, 원격접속 설정, 키보드 타입 기기 및
                  접속 정보 1) PC N/W정보 : IP주소 2) 모바일 기본정보 : UUID,
                  푸시토큰 H/W정보 : 단말기ID(IMEI) 등 기기고유값 ③ 보유 및 이용
                  기간 개인(신용)정보는 개인(신용)정보의 수집 및 이용 목적이
                  달성되면 지체 없이 파기됩니다. 단, 회원으로부터 사전에 동의를
                  받은 경우 또는 상법 등 관련 법규에 의하여 다음과 같이 거래관련
                  권리 의무 관계의 확인 등을 이유로 일정기간 보유해야 할
                  필요성이 있을 경우 회사는 다음과 같이 일정기간 보유합니다.
                  회원가입을 탈회하거나 회원에서 제명된 경우 권리침해/명예훼손
                  분쟁 및 수사협조 의뢰에 대비하여 이용계약 해지일로부터 5년
                  동안 개인(신용)정보를 보존합니다. 계약 또는 청약철회 등에 관한
                  기록 : 5년 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                  소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 기타 고객의
                  동의를 받은 경우 : 동의를 받은 기간까지 ※ 귀하는
                  개인(신용)정보의 수집ㆍ이용에 대한 동의를 거부할 수 있습니다.
                  다만, 본 동의는 비씨카드 서비스 제공을 위한 필수 동의로 귀하가
                  이에 동의하지 않을 경우 서비스의 이용이 불가능하오니 이점
                  유의하여 주시기 바랍니다.
                </textarea>
              </td>
            </tr>
          </table>
        </div>
        <Link to="/signup/3">
          <button className="SU_input_btn" onClick={onClick}>
            다음
          </button>
        </Link>
      </form>
    </>
  );
};

export default Signup_input;
