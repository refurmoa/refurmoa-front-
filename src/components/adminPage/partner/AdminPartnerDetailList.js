import "./AdminPartnerDetailList.css";
import partnerlistdata from "../user/AdminUserDetailBidList.json";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminPartnerDetailList = () => {
  // const [partnerlistdata, setPartnerlistdata] = useState();
  // const id = window.sessionStorage.getItem("id");

  const searchpartRef = useRef();
  const APDsearch = (e) => {
    if (
      searchpartRef.current.value === "" ||
      searchpartRef.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      searchpartRef.current.focus();
      return false;
    }
    console.log(searchpartRef.current.value);
    // axios
    //   .post(`/admin/partner/prod/search`, {
    //     search: searchpartRef.current.value,
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     setPartnerlistdata(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
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
            ref={searchpartRef}
          ></input>
          <input
            className="APDsearchboxbutton"
            type="button"
            onClick={APDsearch}
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
                onClick={onClick}
              />
              <div className="APDBidListInfo">
                <div className="APDBidListInfoDate">{partnerlist.reg_date}</div>
                <div className="APDBidListInfoCom">{partnerlist.prod_com}</div>
                <div className="APDBidListInfoName" onClick={onClick}>
                  {partnerlist.prod_name}
                </div>
              </div>
              <div className="APDBidListPirce">
                {partnerlist.prod_state === 0 ? (
                  <div>
                    <div className="APDBidListPirceRed">게시 전</div>
                    <span className="APDBidListPircenum">
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
                      {partnerlist.org_price.toLocaleString("ko-KR")}원
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
