import "./AdminPartnerDetail.css";
import { AdminPartnerDetailList } from "./AdminPartnerDetailList";
import partnerdata from "./AdminPartnerDetail.json";
import { useState } from "react";
import Modal from "react-modal";
import UpdatePartner from "./AdminPartnerDetailUpdate";
import axios from "axios";

const AdminPartnerDetail = () => {
  const APDpush = () => {
    // axios
    //   .post("/api/APDpush", {
    //     com_name: com_name,
    //   })
    //   .then((res) => {
    //     postUserData();
    //   });
  };

  const APDend = () => {
    // axios
    //   .post("/api/APDend", {
    //     com_name: com_name,
    //   })
    //   .then((res) => {
    //     postUserData();
    //   });
  };

  // const [partnerdata, setPartnerdata] = useState();
  const getUserData = () => {
    // axios
    //   .get(`/api/get/PartnerData`{
    //   name : name
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setPartnerdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setPartnerdata(data);
  };

  const [Partner_popup, setPartnerPopup] = useState(false);
  const [Partner_modal, setPartnerModal] = useState(false);
  const Partner_ChangePopUP = () => {
    setPartnerPopup(true);
    setPartnerModal(true);
  };
  const Partner_close_modal = () => {
    setPartnerPopup(false);
    setPartnerModal(false);
  };

  return (
    <div className="APDAll">
      <div className="APDLeftAll">
        <div className="APDLeftInfo">
          <div>{partnerdata.com_name}</div>
          <div>연락처</div>
          <div>{partnerdata.com_phone}</div>
          <div>이메일</div>
          <div>{partnerdata.com_email}</div>
          <div>주소</div>
          <div>
            {partnerdata.com_addr}
            &nbsp;{partnerdata.com_detail_addr}
          </div>
          <div>대표명</div>
          <div>{partnerdata.com_ceo_name}</div>
        </div>
        <div className="APDLeftButton">
          {partnerdata.com_status === 0 ? (
            <div>
              <div>
                <input type="button" value="신청 승인" onClick={APDpush} />
              </div>
            </div>
          ) : partnerdata.com_status === 1 ? (
            <div>
              <div>
                <input
                  type="button"
                  value="정보 수정"
                  onClick={Partner_ChangePopUP}
                />
                <Modal
                  style={{
                    overlay: {
                      position: "fixed",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    },
                    content: {
                      position: "absolute",
                      top: "18%",
                      width: "1050px",
                      height: "735px",
                      left: "40px",
                      right: "40px",
                      bottom: "40px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "15px",
                      outline: "none",
                      padding: "30px",
                    },
                  }}
                  isOpen={Partner_modal}
                >
                  <div className="close_modal">
                    <button onClick={Partner_close_modal}>
                      <b>X</b>
                    </button>
                  </div>
                  <div>
                    {Partner_popup && (
                      <UpdatePartner getUserData={getUserData} />
                    )}
                  </div>
                </Modal>
              </div>
              <div>
                <input type="button" value="제휴 종료" onClick={APDend} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="APDRightAll">
        <AdminPartnerDetailList />
      </div>
    </div>
  );
};
export default AdminPartnerDetail;
