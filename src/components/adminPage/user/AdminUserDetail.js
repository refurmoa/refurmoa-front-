import "./AdminUserDetail.css";
import { AdminUserDetailBidList } from "./AdminUserDetailBidList";
import { AdminUserDetailPayList } from "./AdminUserDetailPayList";
import userdata from "./AdminUserDetail.json";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminUserDetail = (props) => {
  const location = useLocation();
  const id = location.state.member_id;
  console.log(id);
  const [pageNum, setPageNum] = useState(0);
  const [cuList, setCuList] = useState(0);

  const AUDCuList = () => {
    // axios
    //   .post(`/admin/user/detail/culist`{
    //   id:id
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setCuList(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setCuList(data);
  };

  const AUDCuInput = () => {
    // axios
    //   .post(`/admin/user/detail/insertcu`{
    //   id:id
    // })
    //   .then((res) => {
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  // const [userdata, setUserdata] = useState();
  // const id = window.sessionStorage.getItem("id");
  const postUserData = () => {
    // axios
    //   .post(`/admin/user/detail/memberinfo`{
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
            <Link
              className="AUDUpdatLink"
              to={`/userupdate`}
              state={{ id: id }}
            >
              <input type="button" value="수정"></input>
            </Link>
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
          <div>{id}</div>
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
          <AdminUserDetailPayList setPageNum={setPageNum} id={id} />
        )}
      </right>
    </div>
  );
};
export default AdminUserDetail;
