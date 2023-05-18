import "./AdminUserDetailBidList.css";
import userlist from "./AdminUserDetailBidList.json";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminUserDetailBidList = ({ setPageNum }) => {
  const changePage = () => {
    setPageNum(1);
  };

  // const [userbidlist, setUserbidlist] = useState();
  // const id = window.sessionStorage.getItem("id");
  const postUserData = () => {
    // axios
    //   .get(`/api/post/UserBidList`{
    //   id:id
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setUserdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setUserbidlist(data);
  };

  const SearchBidList = useRef();
  // const [userlist, setUserlist] = useState();
  const AUDsearch = () => {
    if (
      SearchBidList.current.value === "" ||
      SearchBidList.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      SearchBidList.current.focus();
      return false;
    }

    // axios
    //   .post(`/api/searchlocation`, {
    //     searchData,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setUserlist();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  const navigate = useNavigate();
  const onClick = (board_num) => {
    navigate(`/post/detail/${board_num}`);
  };

  return (
    <div>
      <top className="AUDBidList">
        <div className="AUDBidListL">입찰 내역</div>
        <div className="AUDBidListM" onClick={changePage}>
          결제 내역
        </div>
        <div className="AUDinput">
          <input className="AUDsearchbox" type="text"></input>
          <input
            className="AUDsearchboxbutton"
            type="button"
            onClick={AUDsearch}
            ref={SearchBidList}
          ></input>
        </div>
      </top>
      {userlist.userlist.length === 0 ? (
        <div className="AUDBidNoList">입찰내역이 없습니다.</div>
      ) : (
        <div className="AUDBidListFull">
          {userlist.userlist.map((userlist) => (
            <bottom className="AUDBidList">
              <img
                src={`/images/prod/${userlist.main_image}`}
                alt=""
                onClick={() => onClick(userlist.board_num)}
              />
              <div className="AUDBidListInfo">
                <div className="AUDBidListInfoDate">
                  {userlist.start_date} ~ {userlist.end_date}
                </div>
                <div className="AUDBidListInfoCom">{userlist.prod_com}</div>
                <div
                  className="AUDBidListInfoName"
                  onClick={() => onClick(userlist.board_num)}
                >
                  {userlist.prod_name}
                </div>
              </div>
              <div className="AUDBidListPirce">
                {userlist.prod_state === 1 ? (
                  <div>
                    <div className="AUDBidListPirceGreen">진행중</div>
                    <div>
                      <span className="AUDBidListPircetext">입찰가</span>
                      <span className="AUDBidListPircenum">
                        {userlist.bid_price.toLocaleString("ko-KR")}원
                      </span>
                    </div>
                    <span className="AUDBidListPircetext">현재가</span>
                    <span className="AUDBidListPircenum">
                      {userlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : userlist.prod_state >= 2 && userlist.bid_cancle === 0 ? (
                  <div>
                    <div className="AUDBidListPirceRed">낙찰</div>

                    <span className="AUDBidListPircetext">낙찰가</span>
                    <span className="AUDBidListPircenum">
                      {userlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="AUDBidListPirceBrown">패찰</div>
                    <div>
                      <span className="AUDBidListPircetext">입찰가</span>
                      <span className="AUDBidListPircenum">
                        {userlist.bid_price.toLocaleString("ko-KR")}원
                      </span>
                    </div>
                    <span className="AUDBidListPircetext">낙찰가</span>
                    <span className="AUDBidListPircenum">
                      {userlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                )}
              </div>
            </bottom>
          ))}
        </div>
      )}
    </div>
  );
};
