import "./AdminPartnerDetailList.css";
import partnerlistdata from "../user/AdminUserDetailBidList.json";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminPartnerDetailList = () => {
  // const [partnerlistdata, setPartnerlistdata] = useState();
  // const id = window.sessionStorage.getItem("id");
  const postPartnerData = () => {
    // axios
    //   .get(`/api/post/PartnerListData`{
    //   name : name
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setPartnerlistdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setPartnerlistdata(data);
  };

  const SearchBidList = useRef();

  const AUDsearch = (e) => {
    if (
      SearchBidList.current.value === "" ||
      SearchBidList.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      SearchBidList.current.focus();
      return false;
    }
    // axios
    //   .post(`/api/post/PartnerSearchData`{
    //   search : e.target.value
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     setPartnerlistdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // setPartnerlistdata(data);
  };

  const navigate = useNavigate();
  const onClick = (board_num) => {
    navigate(`/post/detail/${board_num}`);
  };

  const today = new Date();

  return (
    <div>
      <top className="APDBidList">
        <div className="APDBidListL">
          <span className="APDBidListL1">제휴 제품</span>
          <span className="APDBidListL2">
            ({partnerlistdata.userlist.length}개)
          </span>
        </div>
        <div className="APDinput">
          <input
            className="APDsearchbox"
            type="text"
            ref={SearchBidList}
          ></input>
          <input
            className="APDsearchboxbutton"
            type="button"
            onClick={AUDsearch}
          ></input>
        </div>
      </top>
      {partnerlistdata.userlist.length === 0 ? (
        <div className="APDBidNoList">입찰내역이 없습니다.</div>
      ) : (
        <div className="APDBidListFull">
          {partnerlistdata.userlist.map((partnerlist) => (
            <bottom className="APDBidList">
              <img
                src={`/images/prod/${partnerlist.main_image}`}
                alt=""
                onClick={() => onClick(partnerlist.board_num)}
              />
              <div className="APDBidListInfo">
                <div className="APDBidListInfoDate">{partnerlist.reg_date}</div>
                <div className="APDBidListInfoCom">{partnerlist.prod_com}</div>
                <div
                  className="APDBidListInfoName"
                  onClick={() => onClick(partnerlist.board_num)}
                >
                  {partnerlist.prod_name}
                </div>
              </div>
              <div className="APDBidListPirce">
                {partnerlist.prod_state === 0 ? (
                  <div>
                    <div className="APDBidListPirceRed">게시 전</div>
                    <span className="APDBidListPircenum">
                      {partnerlist.auction_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 1 &&
                  today <= new Date(partnerlist.start_date) ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 전</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}

                    <span className="APDBidListPircenum">
                      {partnerlist.auction_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 1 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 중</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                      {partnerlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 2 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                      {partnerlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 3 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                      {partnerlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 4 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                      {partnerlist.cur_price.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="APDBidListPirceBlack">구매 확정</div>
                    {partnerlist.sell_type === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_type === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                      {partnerlist.cur_price.toLocaleString("ko-KR")}원
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
