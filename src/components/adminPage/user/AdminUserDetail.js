import "./AdminUserDetail.css";
import { AdminUserDetailBidList } from "./AdminUserDetailBidList";
import { AdminUserDetailPayList } from "./AdminUserDetailPayList";
// import userdata from "./AdminUserDetail.json";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import CouponFind from "../../Pay/CouponlList";
const AdminUserDetail = () => {
  const location = useLocation();
  const id = location.state.member_id;
  const [userdata, setUserdata] = useState([]);
  const [milePoint, setMilePoint] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [cuList, setCuList] = useState(0);
  const [Modal, setModal] = useState(false); // 쿠폰 찾기 모달
 
  const AUDCuInput = () => {
    // axios
    //   .post(`/admin/user/detail/coupon/insert`{
    //   member_id:
    //  coupon_name:
    //  sale_price:
    //  issue_date:
    //  valid_date:
    // })
    //   .then((res) => {
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  useEffect(() => {
    axios
      .post("/user/info", {
        memberId: id,
      })
      .then((res) => {
        setMilePoint(res.data.mile);
        setUserdata(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="AUDAll">
      <left className="AUDLeftAll">
        <info className="AUDLeftInfo">
          <div>
            <div className="AUDLeftInfo1">회원정보</div>
            <Link
              className="AUDUpdatLink"
              to={`/user/update`}
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
            &nbsp;{userdata.detailAddress}
          </div>
          <div>마일리지</div>
          <div>{milePoint.toLocaleString("ko-KR")}</div>
        </info>
        <div className="AUDLeftButton">
          <div>
            <input type="button" value="쿠폰 내역" onClick={()=>setModal(true)} />
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
         {/*쿠폰 모달*/}
         {Modal &&
                <div className="Coupon_modal_overlay">
                    <div className="Coupon_modal">
                        <CouponFind id={id} state={0} setModal={setModal} />
                    </div>
                </div>
            }
    </div>
  );
};
export default AdminUserDetail;
