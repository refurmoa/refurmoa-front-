import "./AdminUserDetailPayList.css";
import { useRef, useState } from "react";

export const AdminUserDetailPayList = ({ setPageNum }) => {
  const changePage = () => {
    setPageNum(0);
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

  return (
    <div>
      <top className="AUDPayList">
        <div className="AUDPayListL">결제 내역</div>
        <div className="AUDPayListM" onClick={changePage}>
          입찰 내역
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
      <bottom className="AUDPayList">
        <div>사진</div>
        <div>
          <div>경매 기간asdfasdfasdf</div>
          <div>기업 이름</div>
          <div>제품 이름</div>
        </div>
        <div>
          <div>경매 상태</div>
          <div>입찰가</div>
          <div>현재가</div>
        </div>
      </bottom>
    </div>
  );
};
