import "./AdminUserDetail.css";
import { AdminUserDetailBidList } from "./AdminUserDetailBidList";
import { AdminUserDetailPayList } from "./AdminUserDetailPayList";
import userdata from "./AdminUserDetail.json";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AdminUserDetail = () => {
  // const location = useLocation();
  // const id = location.state;
  // console.log(id);
  const [pageNum, setPageNum] = useState(0);

  const AUDCuList = () => {};

  const AUDCuInput = () => {};

  const AUDUserUpdate = () => {};

  // const [userdata, setUserdata] = useState();
  // const id = window.sessionStorage.getItem("id");
  const postUserData = () => {
    // axios
    //   .get(`/api/post/UserData`{
    //   id:id
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setUserdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setUserdata(data);
  };

  return (
    <div className="AUDAll">
      <left className="AUDLeftAll">
        <info className="AUDLeftInfo">
          <div>
            <div className="AUDLeftInfo1">회원정보</div>
            <input type="button" value="수정" onClick={AUDUserUpdate}></input>
          </div>
          <div className="AUDLeftInfo2">회원등급</div>
          <div className="AUDLeftInfo3">
            {userdata.grade === 1
              ? "SILVER"
              : userdata.grade === 2
              ? "GOLD"
              : userdata.grade === 3
              ? "VIP"
              : userdata.grade === 4
              ? "VVIP"
              : "BRONZE"}
          </div>
          <div>이름</div>
          <div>{userdata.name}</div>
          <div>아이디</div>
          <div>{userdata.member_id}</div>
          <div>생년월일</div>
          <div>{userdata.birth}</div>
          <div>연락처</div>
          <div>{userdata.phone}</div>
          <div>이메일</div>
          <div>{userdata.email}</div>
          <div>주소</div>
          <div>
            {userdata.address}
            &nbsp;{userdata.detail_address}
          </div>
          <div>마일리지</div>
          <div>{userdata.mile.toLocaleString("ko-KR")}</div>
        </info>
        <div className="AUDLeftButton">
          <div>
            <input type="button" value="쿠폰 내역" onClick={AUDCuList} />
          </div>
          <div>
            <input type="button" value="쿠폰 등록" onClick={AUDCuInput} />
          </div>
        </div>
      </left>
      <right className="AUDRightAll">
        {pageNum === 0 ? (
          <AdminUserDetailBidList setPageNum={setPageNum} />
        ) : (
          <AdminUserDetailPayList setPageNum={setPageNum} />
        )}
      </right>
    </div>
  );
};
export default AdminUserDetail;
