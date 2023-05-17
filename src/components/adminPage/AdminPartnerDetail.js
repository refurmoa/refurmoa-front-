import "./AdminPartnerDetail.css";
import { AdminPartnerDetailList } from "./AdminPartnerDetailList";
import partnerdata from "./AdminPartnerDetail.json";
import { useState } from "react";
import axios from "axios";

const AdminPartnerDetail = () => {
  const APDpush = () => {
    axios.get("/api/APDpush");
  };

  const APDupdate = () => {};

  const APDend = () => {};

  // const [partnerdata, setPartnerdata] = useState();
  const postUserData = () => {
    // axios
    //   .get(`/api/post/PartnerData`{
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

  return (
    <div className="APDAll">
      <left className="APDLeftAll">
        <info className="APDLeftInfo">
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
        </info>
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
                <input type="button" value="정보 수정" onClick={APDupdate} />
              </div>
              <div>
                <input type="button" value="제휴 종료" onClick={APDend} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </left>
      <right className="APDRightAll">
        <AdminPartnerDetailList />
      </right>
    </div>
  );
};
export default AdminPartnerDetail;
