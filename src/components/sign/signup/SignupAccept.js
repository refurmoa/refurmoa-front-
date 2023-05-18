import React from "react";
import "./Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { noticeList } from "../../shared/AcceptText";
const Signup_accept = () => {
  const [check_ALL, setCheck_ALL] = useState(false);
  const [check_box1, setCheck_box1] = useState(false);
  const [check_box2, setCheck_box2] = useState(false);
  const [check_box3, setCheck_box3] = useState(false);
  const [check_box4, setCheck_box4] = useState(false);

  const text1 = noticeList[0].content;
  const text2 = noticeList[1].content;
  const text3 = noticeList[2].content;
  const text4 = noticeList[3].content;

  const onCHKALL = (e) => {
    if (e.target.checked) {
      setCheck_ALL(true);
      setCheck_box1(true);
      setCheck_box2(true);
      setCheck_box3(true);
      setCheck_box4(true);
    } else {
      setCheck_ALL(false);
      setCheck_box1(false);
      setCheck_box2(false);
      setCheck_box3(false);
      setCheck_box4(false);
    }
  };
  const onCHKBOX1 = (e) => {
    if (e.target.checked) {
      setCheck_box1(true);
    } else {
      setCheck_box1(false);
    }
  };
  const onCHKBOX2 = (e) => {
    if (e.target.checked) {
      setCheck_box2(true);
    } else {
      setCheck_box2(false);
    }
  };
  const onCHKBOX3 = (e) => {
    if (e.target.checked) {
      setCheck_box3(true);
    } else {
      setCheck_box3(false);
    }
  };
  const onCHKBOX4 = (e) => {
    if (e.target.checked) {
      setCheck_box4(true);
    } else {
      setCheck_box4(false);
    }
  };
  const onClick = () => {
    if (check_box1 && check_box2) {
      alert("회원가입을 마치시겠습니까?");
      /*
      axios
      .post("/signup", {
        ACCEPT_LOCATION: check_box3,
        ACCEPT_ALARM:check_box4,
      })
      .then((res) => {

      })
      .catch((e) => {
        console.error(e);
      });
      */
      document.location.href = "/signup/4";
    } else {
      alert("필수 정보를 체크해주세요!!");
      return false;
    }
  };

  return (
    <>
      <form className="SU_accept_form">
        <div className="SU_Main_header">회원가입</div>
        <div className="SU_sub_header">
          01 본인인증 &nbsp;&nbsp; 02 정보입력 &nbsp;&nbsp;
          <n className="SU_pro_now">03 약관동의</n> &nbsp;&nbsp; 04 가입완료
        </div>
        <div className="form_wrap">
          <table className="SU_input_table">
            <tr>
              <td className="SU_accept">
                <input
                  type="checkbox"
                  className="SU_accept"
                  onClick={onCHKALL}
                />
                &nbsp; <b>약관 전체 동의</b>
              </td>
            </tr>
            <tr>
              <td className="SU_accept">
                <input
                  type="checkbox"
                  className="SU_accept"
                  onClick={onCHKBOX1}
                  checked={check_box1}
                />
                &nbsp; 이용약관 동의 (필수)
              </td>
            </tr>
            <tr>
              <td>
                <textarea className="accepts" value={text1} />
              </td>
            </tr>

            <tr>
              <td className="SU_accept">
                <input
                  type="checkbox"
                  className="SU_accept"
                  onClick={onCHKBOX2}
                  checked={check_box2}
                />
                &nbsp;개인정보 수집 및 이용 동의 (필수)
              </td>
            </tr>
            <tr>
              <td>
                <textarea className="accepts" value={text2} />
              </td>
            </tr>
            <tr>
              <td className="SU_accept">
                <input
                  type="checkbox"
                  className="SU_accept"
                  onClick={onCHKBOX3}
                  checked={check_box3}
                />
                &nbsp;위치기반 서비스 이용약관 동의 (선택)
              </td>
            </tr>
            <tr>
              <td>
                <textarea className="accepts" value={text3} />
              </td>
            </tr>
            <tr>
              <td className="SU_accept">
                <input
                  type="checkbox"
                  className="SU_accept"
                  onClick={onCHKBOX4}
                  checked={check_box4}
                />
                &nbsp;알림서비스 수신 동의 (선택)
              </td>
            </tr>
            <tr>
              <td>
                <textarea className="accepts" value={text4}></textarea>
              </td>
            </tr>
          </table>
        </div>
        <Link to="/signup/3">
          <button className="SU_input_btn" onClick={onClick}>
            회원 가입
          </button>
        </Link>
      </form>
    </>
  );
};

export default Signup_accept;
