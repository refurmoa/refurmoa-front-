import "./AdminPartnerDetail.css";
import { AdminPartnerDetailList } from "./AdminPartnerDetailList";
import partnerdata from "./AdminPartnerDetail.json";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import UpdatePartner from "./AdminPartnerDetailUpdate";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminPartnerDetail = () => {

  const location = useLocation();
  const partner = location.state.partner;
  const num=partner.com_num
  const [data,setData] = useState([]);
  
  useEffect(()=>{
    
    axios
      .get(`/admin/partner/detail?com_num=${num}`)
      .then((res) => {
        setData(res.data);
      });
  },[partner])
  const patnerState=(item)=>{
    if(item===1){
      if(window.confirm("신청을 승인하시겠습니까?"))APDChange()
      else return false;
    }
    else{
      if(window.confirm("제휴를 종료하시겠습니까?"))APDChange()
      else return false;
    }
  }

  const APDChange = () => {
    const num=partner.com_num
    axios
      .get(`/admin/partner/detail/change?com_num=${num}`)
      .then((res) => {
        setData(res.data);
      });
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
          <div>{data.com_name}</div>
          <div>연락처</div>
          <div>{data.com_phone}</div>
          <div>이메일</div>
          <div>{data.com_email}</div>
          <div>주소</div>
          <div>
            {data.comAddr}
            &nbsp;{data.com_detail_addr}
          </div>
          <div>대표명</div>
          <div>{data.com_ceo_name}</div>
        </div>
        <div className="APDLeftButton">
          {data.com_status === 0 ? (
            <div>
              <div>
                <input type="button" value="신청 승인" onClick={()=>patnerState(1)} />
              </div>
            </div>
          ) : data.com_status === 1 ? (
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
                      // top: "18%",
                      width: "750px",
                      height: "700px",
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
                  <div className="APDModalClose">
                    <button onClick={Partner_close_modal}>
                      <b>X</b>
                    </button>
                  </div>
                  <div>
                    {Partner_popup && (
                      <UpdatePartner partner={data} Partner_close_modal={Partner_close_modal}  />
                    )}
                  </div>
                </Modal>
              </div>
              <div>
                <input type="button" value="제휴 종료" onClick={()=>patnerState(2)} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="APDRightAll">
        <AdminPartnerDetailList num={num} status={data.com_status}/>
      </div>
    </div>
  );
};
export default AdminPartnerDetail;
