import React from "react";
import "./AdminPartnerDetailUpdate.css";
import Post from "../../shared/FindAddress";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const UpdatePartner = (props) => {
  const partner = props.partner;
  const Partner_close_modal=props.Partner_close_modal;
  const [com_num, setComNum] = useState(partner.com_num);
  const [com_name, setComName] = useState(partner.com_name);
  const [com_ceo_name, setCeo] = useState(partner.com_ceo_name);
  const [com_phone, setComPhone] = useState(partner.com_phone);
  const [com_email, setComEmail] = useState(partner.com_email);
  const [com_addr, setComAddr] = useState(partner.com_addr);
  const [com_status, setStatus] = useState(partner.com_status);
  const [com_detail_addr, setComAddrDetail] = useState(partner.com_detail_addr);
  const [domain, setDomain] = useState(props.partner.com_email.split('@')[1]);
  const [email, setEmail] = useState(props.partner.com_email.split('@')[0]);
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


  const onClick = () => {
    
    axios
      .post("/admin/partner/update", {
        comNum:com_num,
        comName: com_name,
        comCeoName: com_ceo_name,
        comPhone: com_phone,
        comEmail: email.concat("@", domain),
        comAddr: com_addr,
        comDetailAddr: com_detail_addr,
        comStatus:com_status
      })
      .then((res) => {
        console.log(res.data);
        alert("수정이 완료되었습니다.")
        window.location.reload();
        Partner_close_modal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const setDomin = (e) => {
    setDomain(e.target.value);
  };

  return (
    <div>
      <div className="APDUheader">제휴회사 정보 수정</div>
      <div className="APDUmiddle">
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch">업체명</div>
          <input
            className="APDUmiddleinfoInput"
            name="name"
            type="text"
            placeholder="업체명"
            value={com_name}
            onChange={(e) => setComName(e.target.value)}
          ></input>
        </div>
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch">대표명</div>
          <input
            className="APDUmiddleinfoInput"
            name="name"
            type="text"
            placeholder="대표명"
            value={com_ceo_name}
            onChange={(e) => setCeo(e.target.value)}
          ></input>
        </div>
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch">연락처</div>
          <input
            className="APDUmiddleinfoInput"
            name="name"
            type="text"
            placeholder="연락처"
            value={com_phone}
            onChange={(e) => setComPhone(e.target.value)}
          ></input>
        </div>
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch">이메일</div>
          <div className="APDUmiddleinfochEmail">
            <input
              className="APDUmiddleinfoInputE"
              name="email"
              type="text"
              placeholder="이메일"
              maxLength="15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="APDUEmailIcon">@</span>
            <input
              className="APDUmiddleinfoInputE2"
              name="domain"
              id="domain-txt"
              type="text"
              placeholder="직접 입력"
              value={domain}
              maxLength="15"
              onChange={setDomin}
            />
            <select
              class="APDUmiddleinfoselect"
              id="domain-list"
              name="domain"
              onChange={setDomin}
            >
              <option value={domain}>직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
        </div>
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch">주소</div>
          <div className="APDUfindaddr">
            <input
              className="APDUmiddleinfoInputADDR"
              name="address"
              type="text"
              size="100"
              placeholder={partner.com_addr}
              value={com_addr}
              required={true}
              
              maxLength="50"
            />
            <input
              type="button"
              className="APDUAddrButton"
              onClick={ChangePopUP}
              value="주소찾기"
            ></input>
          </div>

          <Modal
            style={{
              overlay: {
                position: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
              content: {
                position: "absolute",
                top: "25%",
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
            <div className="APDUAddrModalClose">
              <button onClick={close_modal}>
                <b>X</b>
              </button>
            </div>
            <div>
              {popup && (
                <Post setAddress={setComAddr} setMdoal={setModal}></Post>
              )}
            </div>
          </Modal>
        </div>
        <div className="APDUmiddleinfo">
          <div className="APDUmiddleinfoch"></div>
          <input
            className="APDUmiddleinfoInput"
            name="address_detail"
            type="text"
            placeholder="상세 주소"
            maxLength="50"
            value={com_detail_addr}
            onChange={(e) => setComAddrDetail(e.target.value)}
          />
        </div>
      </div>
      <div className="APDUbutton">
        <button className="APDUbutontext" onClick={onClick}>
          수정
        </button>
      </div>
    </div>
  );
};

export default UpdatePartner;
