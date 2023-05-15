import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ProdPost from "./ProdPost";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const navigate = useNavigate();
  const memberId = "admin";
  
  // 경매, 즉시구매 저장 변수 all, auction, direct, none
  const [selectedSellType, setSelectedSellType] = useState("all");
  // 카테고리 저장 변수
  const [selectedCategory, setSelectedCategory] = useState("all");
  // 판매상태 저장 변수
  const [selectedSellStatus, setSelectedSellStatus] = useState("all");
  // 정렬 상태 변수
  const [selectedOrderby, setSelectedOrderby] = useState("new");
  const filter = {
    selectedSellType: selectedSellType,
    selectedCategory: selectedCategory,
    selectedSellStatus: selectedSellStatus,
    selectedOrderby: selectedOrderby
  }

  // 경매, 즉시구매 토글 기능을 위한 상태 변수
  const [auctionState, setAuctionState] = useState(true);
  const [directState, setDirectState] = useState(true);
  // 가전, 가구가 true 일때 세부 카테고리 렌더링을 위한 상태 변수
  const [applianceState, setApplianceState] = useState(false);
  const [furnitureState, setFurnitureState] = useState(false);
  // 판매상태 체크박스 상태 저장 변수
  const [sellStatus, setSellStatus] = useState({yet: true, ing: true, end: true});

  // 경매, 즉시구매, 판매상태 html 리턴
  const buyAndStateFilterBox = () => {
    return (
    <>
      <BuyFilterBox>
        <SellTypeSpan active={auctionState} onClick={()=>{sellTypeHandler("auction")}}>경매</SellTypeSpan>
        <SellTypeSpan active={directState} onClick={()=>{sellTypeHandler("direct")}}>즉시구매</SellTypeSpan>
      </BuyFilterBox>
      <StateFilterBox>
        <span><input id="yet" type="checkbox" value="yet" onClick={(e) => {checkboxHandler(e)}} defaultChecked /><label htmlFor="yet">진행예정</label></span>
        <span><input id="ing" type="checkbox" value="ing" onClick={(e) => {checkboxHandler(e)}} defaultChecked /><label htmlFor="ing">진행중</label></span>
        <span><input id="end" type="checkbox" value="end" onClick={(e) => {checkboxHandler(e)}} defaultChecked /><label htmlFor="end">종료</label></span>
      </StateFilterBox>
    </>)
  }

  // 경매, 즉시구매 누르면 토글기능
  const sellTypeHandler = (type) => {
    if(type === "auction") {
      setAuctionState(!auctionState);
    } else if (type === "direct") {
      setDirectState(!directState);
    }
  };

  // 카테고리
  const categoryHandler = (category) => {
    setSelectedCategory(category);
    if(category === "all") {
      setApplianceState(false);
      setFurnitureState(false);
    } else if(category.includes("app")) {
      setApplianceState(true);
      setFurnitureState(false);
    } else if (category.includes("fur")) {
      setApplianceState(false);
      setFurnitureState(true);
    }
  }

  // 판매상태 체크박스
  const checkboxHandler = (e) => {
    setSellStatus({...sellStatus, [e.target.value]:e.target.checked});
  }

  // 정렬 select 박스
  const orderByHandler = (e) => {
    setSelectedOrderby(e.target.value);
  }

  useEffect(() => {
    // 경매, 즉시구매 버튼 누를 때마다 axios로 담아줄 selectedSellType 변수 값 변경
    if((auctionState === true) & (directState === true)) {
      setSelectedSellType("all");
    } else if((auctionState === true) & (directState === false)) {
      setSelectedSellType("auction");
    } else if((directState === true) & (auctionState === false)) {
      setSelectedSellType("direct");
    } else {
      setSelectedSellType("none");
    }
  }, [auctionState, directState]);

  useEffect(() => {
  // 판매상태 체크박스에 따라 axios로 담아줄 selectedSellStatus 변수 값 변경
    if (sellStatus.yet & sellStatus.ing & sellStatus.end) {
      setSelectedSellStatus("all");
    } else if (!sellStatus.yet & sellStatus.ing & sellStatus.end) {
      setSelectedSellStatus("ingnend");
    } else if (sellStatus.yet & !sellStatus.ing & sellStatus.end) {
      setSelectedSellStatus("yetnend");
    } else if (sellStatus.yet & sellStatus.ing & !sellStatus.end) {
      setSelectedSellStatus("yetning");
    } else if (sellStatus.yet & !sellStatus.ing & !sellStatus.end) {
      setSelectedSellStatus("yet");
    } else if (!sellStatus.yet & sellStatus.ing & !sellStatus.end) {
      setSelectedSellStatus("ing");
    } else if (!sellStatus.yet & !sellStatus.ing & sellStatus.end) {
      setSelectedSellStatus("end");
    } else {
      setSelectedSellStatus("none");
    }
  }, [sellStatus]);

  return (
    <ProdListWrapper>
      <FilterBox>
        {memberId === "admin" ? (
          <TopFilterBox>
            <AdminSectionBox>
              {buyAndStateFilterBox()}
            </AdminSectionBox>
            <AdminButtonBox>
              <AdminProductListBtn onClick={() => {navigate("/prod")}}><span>상품 목록</span></AdminProductListBtn>
              <AdminPostBtn onClick={() => {navigate("/post/write")}}><span>등록</span></AdminPostBtn>
            </AdminButtonBox>
          </TopFilterBox>
        ) : (
          <TopFilterBox>
            {buyAndStateFilterBox()}
          </TopFilterBox>
        )}
        <BottomFilterBox>
          <CategoryFilterBox>
            <CategorySpan active={!applianceState & !furnitureState} onClick={()=>{categoryHandler("all")}}>전체</CategorySpan>
            <CategorySpan active={applianceState} onClick={()=>{categoryHandler("appliance")}}>가전</CategorySpan>
            <CategorySpan active={furnitureState} onClick={()=>{categoryHandler("furniture")}}>가구</CategorySpan>
            {applianceState && (
              <>
                <CategoryDetailSpan active={selectedCategory === "appliance"} onClick={()=>{categoryHandler("appliance")}}>가전 전체</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "appkiechen"} onClick={()=>{categoryHandler("appkiechen")}}>주방</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "applife"} onClick={()=>{categoryHandler("applife")}}>생활</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "appelec"} onClick={()=>{categoryHandler("appelec")}}>전자기기</CategoryDetailSpan>
              </>
            )}
            {furnitureState && (
              <>
                <CategoryDetailSpan active={selectedCategory === "furniture"} onClick={()=>{categoryHandler("furniture")}}>가구 전체</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furliving"} onClick={()=>{categoryHandler("furliving")}}>거실/주방</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furbed"} onClick={()=>{categoryHandler("furbed")}}>침실</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furoffice"} onClick={()=>{categoryHandler("furoffice")}}>사무실</CategoryDetailSpan>
              </>
            )}
          </CategoryFilterBox>
          <OrderbyFilterBox>
              <select onChange={(e) => {orderByHandler(e)}}>
                <option value="new" >최신순</option>
                <option value="view">조회순</option>
                <option value="close">마감순</option>
              </select>
          </OrderbyFilterBox>
        </BottomFilterBox>
      </FilterBox>
      <ProdListBox>
        <ProdPost filter={filter} />
      </ProdListBox>
    </ProdListWrapper>
  );
};
export default PostPage;

const ProdListWrapper = styled.div`
  font-family: 'Noto Sans';
  font-style: normal;
`;

// 필터박스
const FilterBox = styled.div`
  width: 1400px;
  height: 82px;
  margin: 73px auto 50px;
`;

const TopFilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #514438;
  height: 65px;
  line-height: 41px;
`;

const AdminSectionBox = styled.div`
  margin: 0px;
  display: flex;
  justify-content: space-between;
`;

const BuyFilterBox = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  font-weight: 700;
  font-size: 25px;
  color: #514438;
  span:first-child {
    margin-right: 30px;
  }
`;

const SellTypeSpan = styled.span`
  ${({ active }) => active ? css`color: #514438;` : css`color: rgba(81, 68, 56, 0.6);`};
  :hover {
    cursor: pointer;
  }
`;

const StateFilterBox = styled.div`
  margin:20px 35px 0px 30px;
  font-size: 20px;
  font-weight: 600;
  color: rgba(81, 68, 56, 0.8);
  span {
    margin-right: 20px;
  }
  span:last-child {
    margin-right: 0px;
  }

  label {
    color: rgba(81, 68, 56, 0.8);
    cursor: pointer;
  }

  input {
    width: 15px;
    height: 15px;
    margin-right: 7px;
    accent-color: rgba(81, 68, 56, 0.6);
    cursor: pointer;
  }
`;

const AdminButtonBox = styled.div`
  display: flex;
  margin: 0px 35px 13px 0px;

  div {
    font-weight: 700;
    font-size: 20px;
    border: 2px solid #514438;
    border-radius: 10px;
    height: 50px;
    box-sizing: border-box;
  }
  div:hover {
    cursor: pointer;
  }
`;

const AdminProductListBtn = styled.div`
  span {
    color: #514438;
    line-height: 45px;
    padding: 0px 25px;
  }
`;

const AdminPostBtn = styled.div`
  background-color: #514438;
  margin-left: 15px;
  span {
    color: #ffffff;
    line-height: 45px;
    padding: 0px 25px;
  }
`;

const BottomFilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 41px;
  line-height: 41px;
`;

const CategoryFilterBox = styled.div`
  margin-left: 30px;
  font-weight: 700;
  font-size: 25px;
  color: rgba(81, 68, 56, 0.6);
`;

const CategorySpan = styled.span`
  ${({ active }) => active ? css`color: #514438;` : css`color: rgba(81, 68, 56, 0.6);`};
  margin-right: 30px;
  :hover {
    cursor: pointer;
  }
`;

const CategoryDetailSpan = styled.span`
  ${({ active }) => active ? css`color: #514438;` : css`color: rgba(81, 68, 56, 0.6);`};
  margin-right: 30px;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;

const OrderbyFilterBox = styled.div`
  margin-right: 35px;
  select {
    width: 100%;
    height: 100%;
    line-height: 25px;

    border: 0px;
    /* appearance: none;  */
    /* for chrome */
    /* -webkit-appearance: none; */
    /* for firefox */
    /* -moz-appearance: none; */
    /*for IE10,11*/
    /* select::-ms-expand{
      display:none;
    } */

    box-sizing: border-box;

    font-size: 20px;
    font-weight:500;
    color: rgba(81, 68, 56, 0.8);

    :hover {
      cursor: pointer;
    }
    :focus {
      outline: none;
      border: 0px;
    }
    option {
      color: rgba(81, 68, 56, 0.8);
    }
  }
`;

// 상품리스트 박스
const ProdListBox = styled.div`
  width: 1350px;
  margin: 0px auto;
`;
