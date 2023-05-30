import "./AdminPartnerDetailList.css";
import partnerlistdata from "../user/AdminUserDetailBidList.json";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import moment from 'moment';

export const AdminPartnerDetailList = (props) => {
  const num =props.num;
  const [partnerlist, setPartnerlist] = useState([]);
  // const id = window.sessionStorage.getItem("id");
  const [ref, inView] = useInView(); // 하단의 ref가 화면에 보여지면 inView 값이 true로 바뀜
  const [page, setPage] = useState(0); // 페이지
  const [searchData, setSearchData] = useState(""); // 검색어

  const getPartnerList = () => {

    axios
    .get(`/admin/partner/prod?com_num=${num}&search=${searchData}&page=${page}&size=15`)
    .then((res) => {
      const { data } = res;
      setPartnerlist([...partnerlist, ...data.content]);
      setPage((page) => page+1);
    })
    .catch((e) => {
      console.error(e);
    });
  }
  const searchPartner = () => {
    
    axios
    .get(`/admin/partner/prod/search?com_num=${num}&search=${searchData}&page=0&size=15`)
    .then((res) => {
      const { data } = res;
      setPartnerlist([...data.content]);
      setPage(1);
    })
    .catch((e) => {
      console.error(e);
    });
   
  };
  useEffect(() => {
    
    // 검색상태가 아니고 하단의 ref를 만났을 때
    if ((inView) ) {
      getPartnerList();
      // 검색상태이고 하단의 ref를 만났을 때
    } 
  }, [inView,searchData]);

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
            ({partnerlist.length}개)
          </span>
        </div>
        <div className="APDinput">
          <input
            className="APDsearchbox"
            type="text"
            value={searchData}
            onChange={(e)=>setSearchData(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') searchPartner();}}
          ></input>
          <input
            className="APDsearchboxbutton"
            type="button"
            onClick={() => {searchPartner()}}
          ></input>
        </div>
      </top>
      {partnerlist.length===0? (
        <div className="APDBidNoList">입찰내역이 없습니다.</div>
      ) : (
        <div className="APDBidListFull">
          {partnerlist.map((partnerlist) => (
            <bottom className="APDBidList">
              <img
                src={`${process.env.PUBLIC_URL}/images/${partnerlist.mainImage}`}
                alt=""
                onClick={onClick}
              />
              <div className="APDBidListInfo">
                <div className="APDBidListInfoDate">{moment(partnerlist.regDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div className="APDBidListInfoCom">{partnerlist.prodCom}</div>
                <div className="APDBidListInfoName" onClick={onClick}>
                  {partnerlist.prodName}
                </div>
              </div>
              <div className="APDBidListPirce">
                {partnerlist.prodState === 0 ? (
                  <div>
                    <div className="APDBidListPirceRed">게시 전</div>
                    <span className="APDBidListPircenum">
                      {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : partnerlist.prodState === 1 &&
                  today <= new Date(partnerlist.start_date) ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 전</div> {partnerlist.orgPrice}
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}

                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 1 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 중</div>
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 2 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 3 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : partnerlist.prod_state === 4 ? (
                  <div>
                    <div className="APDBidListPirceBlack">판매 완료</div>
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="APDBidListPirceBlack">구매 확정</div>
                    {partnerlist.sell_status === 1 ? (
                      <div className="APBBidListSellType">경매</div>
                    ) : partnerlist.sell_status === 2 ? (
                      <div className="APBBidListSellType">즉시구매</div>
                    ) : (
                      <div className="APBBidListSellType">경매, 즉시구매</div>
                    )}
                    <span className="APDBidListPircenum">
                       {partnerlist.orgPrice}원
                    </span>
                  </div>
                )}
              </div>
            </bottom>
          ))}
        </div>
      )}
       <div ref={ref} />
    </div>
  );
};
