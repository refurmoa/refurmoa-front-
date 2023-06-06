// 상품 목록 페이지

import React, { useRef, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// 이미지파일
import searchicon from "../../images/search.png"
import loadingicon from "../../images/loading-icon-brown.png"


const ProductList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("id") !== "admin") navigate("/");
  })

  const searchRef = useRef();
  const [prodData, setProdData] = useState([]);

  // 카테고리 저장 변수
  const [selectedCategory, setSelectedCategory] = useState("all");
  // 가전, 가구가 true 일때 세부 카테고리 렌더링을 위한 상태 변수
  const [applianceState, setApplianceState] = useState(false);
  const [furnitureState, setFurnitureState] = useState(false);

  // 판매상태 저장 변수
  const [selectedSellStatus, setSelectedSellStatus] = useState("all");
  // 판매상태 체크박스 상태 저장 변수
  const [sellStatus, setSellStatus] = useState({yet: true, ing: true, end: true});

  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

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

  useEffect(() => {
    // 필터조건이 바뀔때마다 데이터에 axios 요청
    getProdData();
  }, [selectedCategory, selectedSellStatus, currentPage]);

  // 상품 리스트 axios
  const getProdData = () => {
    selectedCategory === "all" && setSelectedCategory("");
    axios
      .get(`/prod?search=${searchRef.current.value.trim()}&category=${selectedCategory}&status=${selectedSellStatus}&page=${currentPage}&size=12`)
      .then((res) => {
        console.log(res.data.content)
        setProdData(setStatusData(res.data.content));
        setTotalPage(res.data.totalPages);
      })
      .catch((e) => {
        getProdData();
        // console.error(e);
      })
  };

  // 엔터키
  const activeEnter = (e) => {
    if(e.key === "Enter") getProdData();
  }

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  // 판매상태 체크박스
  const checkboxHandler = (e) => {
    if (e.target.id === "yet") {
      if (sellStatus.yet && (sellStatus.ing || sellStatus.end)) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: false }));
      else if (!sellStatus.yet) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: true }));
    } else if (e.target.id === "ing") {
      if (sellStatus.ing && (sellStatus.yet || sellStatus.end)) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: false }));
      else if (!sellStatus.ing) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: true }));
    } else if (e.target.id === "end") {
      if (sellStatus.end && (sellStatus.yet || sellStatus.ing)) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: false }));
      else if (!sellStatus.end) setSellStatus((prevSellStatus) => ({ ...prevSellStatus, [e.target.id]: true }));
    }
  }

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
      }
    }, [sellStatus]);

  // 0=게시 전, 1=판매 전, 2=판매 중, 3=판매 완료, 4=구매 확정
  const setStatusData = (data) => {
    for (let i=0; i<data.length; i++) {
      if (data[i].sell_status === 0) {
        data[i].sell_status = "게시 전"
      } else if (data[i].sell_status === 1) {
        data[i].sell_status = "판매 전"
      } else if (data[i].sell_status === 2) {
        data[i].sell_status = "판매 중"
      } else if (data[i].sell_status === 3) {
        data[i].sell_status = "판매 완료"
      } else if (data[i].sell_status === 4) {
        data[i].sell_status = "구매 확정"
      }
    }
    return setCateDetail(data);
  }
  const setCateDetail = (data) => {
    for (let i=0; i<data.length; i++) {
      switch(data[i].categoryCode){
        case "appkitchen":data[i].categoryCode="주방"
        break;
        case "applife":data[i].categoryCode="생활"
        break;
        case "appelec":data[i].categoryCode="전자기기"
        break;
        case "funliving":data[i].categoryCode="거실/주방"
        break;
        case "funbed":data[i].categoryCode="침실"
        break;
        case "funoffice":data[i].categoryCode="사무실"
        break;
        default: break;
      }
      data[i].regDate=moment(data[i].reg_date).format("YYYY-MM-DD")
    }
    return data;
  }

  // 상품삭제
  const deleteHandler = (product_code) => {
    console.log(product_code);
    axios.get(`/prod/delete?product_code=${product_code}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.error(e);
    })
  };

  const detailHandler = (data) => {
    if (data.sell_status === "게시 전") {
      navigate(`/post/write?product_code=${data.product_code}`);
    } else {
      navigate(`/post/detail/${data.product_code}`);
    }
  }


  return (
    <>
      <FilterWrapper>
        <TopFilterBox>
          <CategoryFilterBox>
            <CategorySpan active={!applianceState & !furnitureState} onClick={()=>{categoryHandler("all")}}>전체</CategorySpan>
            <CategorySpan active={applianceState} onClick={()=>{categoryHandler("app")}}>가전</CategorySpan>
            <CategorySpan active={furnitureState} onClick={()=>{categoryHandler("fur")}}>가구</CategorySpan>
            {applianceState && (
              <>
                <CategoryDetailSpan active={selectedCategory === "app"} onClick={()=>{categoryHandler("app")}}>가전 전체</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "appkiechen"} onClick={()=>{categoryHandler("appkitchen")}}>주방</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "applife"} onClick={()=>{categoryHandler("applife")}}>생활</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "appelec"} onClick={()=>{categoryHandler("appelec")}}>전자기기</CategoryDetailSpan>
              </>
            )}
            {furnitureState && (
              <>
                <CategoryDetailSpan active={selectedCategory === "fur"} onClick={()=>{categoryHandler("fur")}}>가구 전체</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furliving"} onClick={()=>{categoryHandler("furliving")}}>거실/주방</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furbed"} onClick={()=>{categoryHandler("furbed")}}>침실</CategoryDetailSpan>
                <CategoryDetailSpan active={selectedCategory === "furoffice"} onClick={()=>{categoryHandler("furoffice")}}>사무실</CategoryDetailSpan>
              </>
            )}
          </CategoryFilterBox>
          <ProductAddBtn onClick={() => {navigate("/prod/write")}}>등록</ProductAddBtn>
        </TopFilterBox>
        <BottomFilterBox>
          <SearchBar>
            <SearchInput>
              <input type="text" ref={searchRef} onKeyDown={(e) => {activeEnter(e)}} placeholder="상품 검색"/>
            </SearchInput>
            <SearchImg onClick={() => {getProdData()}}>
              <img src={searchicon} alt="searchicon"/>
            </SearchImg>
          </SearchBar>
          <StateFilterBox>
            <span><input id="yet" type="checkbox" checked={sellStatus.yet} onChange={(e) => {checkboxHandler(e)}} /><label htmlFor="yet">게시 전</label></span>
            <span><input id="ing" type="checkbox" checked={sellStatus.ing} onChange={(e) => {checkboxHandler(e)}} /><label htmlFor="ing">게시완료</label></span>
            <span><input id="end" type="checkbox" checked={sellStatus.end} onChange={(e) => {checkboxHandler(e)}} /><label htmlFor="end">구매확정</label></span>
          </StateFilterBox>
        </BottomFilterBox>
      </FilterWrapper>
      <ProductListWrapper>
        {prodData?.map((data, index) => (
          <ProductItem key={index}>
            <ProductItemTop>
              <ProductItemTopInner>
              <ProductCategotyCode>{data.category_code}-{data.product_code}</ProductCategotyCode>
              <ComnameAndEditAndDelete>
                <ComnameBox sellState={((data.sell_status === "게시 전") | (data.sell_status === "판매 전"))}>{data.comName}</ComnameBox>
                {/* 판매상태가 1(게시전), 2(판매전)일 때만 수정, 삭제 버튼 렌더링 */}
                {((data.sell_status === "게시 전") | (data.sell_status === "판매 전")) ? 
                <EditAndDeleteBox>
                  <EditBtn onClick={() => {navigate(`/prod/update/${data.product_code}`)}}>수정</EditBtn>
                  <DeleteBtn onClick={() => {deleteHandler(data.product_code)}}>삭제</DeleteBtn>
                </EditAndDeleteBox> : (<></>)}
              </ComnameAndEditAndDelete>
              </ProductItemTopInner>
            </ProductItemTop>
            <ProductMiddle>
              <ProductMiddleInner onClick={() => {detailHandler(data)}}>
                <ProductMainImg>
                  <img src={`/images/prod/${data.main_image}`} alt="productmain" />
                </ProductMainImg>
                <ProductInfoBox>
                  <ProductStateAndDateBox>
                    <ProductState>
                      <img src={loadingicon} alt="loadingicon" />{data.sell_status}
                    </ProductState>
                    <ProductDate>{data.regDate} 입고</ProductDate>
                  </ProductStateAndDateBox>
                  <ProductComBox>
                    {data.prod_com}
                  </ProductComBox>
                  <ProductGradeAndNameBox>
                    <ProductGrade>{data.prod_grade}급</ProductGrade>
                    <ProductName>{data.prod_name}</ProductName>
                  </ProductGradeAndNameBox>
                  <ProductPriceBox>{addComma(data.org_price)}원</ProductPriceBox>
                </ProductInfoBox>
              </ProductMiddleInner>
            </ProductMiddle>
            <ProductBottom>
              <ProductBottomInner>
                <ProductDeffectAndGuaranteeBox>
                  <ProductDeffect>하자내용</ProductDeffect>
                  <ProductGuarantee>{data.guarantee  ? "보증서 있음" : "보증서 없음"}</ProductGuarantee>
                </ProductDeffectAndGuaranteeBox>
                <ProductDeffectText>{data.defect_text}</ProductDeffectText>
                {data.defect_image1 && <ProductDeffectImg><img src={`/images/prod/${data.defect_image1}`} alt="defect1"/></ProductDeffectImg>}
                {data.defect_image2 && <ProductDeffectImg><img src={`/images/prod/${data.defect_image2}`} alt="defect2"/></ProductDeffectImg>}
                {data.defect_image3 && <ProductDeffectImg><img src={`/images/prod/${data.defect_image3}`} alt="defect3"/></ProductDeffectImg>}
              </ProductBottomInner>
            </ProductBottom>
          </ProductItem>
        ))}
      </ProductListWrapper>
      {/* 페이지 출력 */}
      { totalPage > 1 &&
        <PageWrap>
          { currentPage === 0 ? <Page prev gray>&lt;</Page>
            : <Page prev onClick={() => setCurrentPage(currentPage-1)}>&lt;</Page>
          }
          <Page>{currentPage+1}</Page>&nbsp;&nbsp;/&nbsp;&nbsp;<Page gray>{totalPage}</Page>
          { currentPage+1 === totalPage ? <Page next gray>&gt;</Page>
            : <Page next onClick={() => setCurrentPage(currentPage+1)}>&gt;</Page>
          }
        </PageWrap>
      }
    </>
  )
}

export default ProductList;


// 필터
const FilterWrapper = styled.div`
  margin: 73px auto 40px;
  width: 1400px;
`;

const TopFilterBox = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #514438;
  box-sizing: border-box;
`;
const CategoryFilterBox = styled.div`
  margin: 20px 0px 0px 30px;
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
const ProductAddBtn = styled.div`
  margin: 0px 35px 13px 0px;
  width: 85px;
  height: 50px;
  background-color: #514438;
  border-radius: 10px;

  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
  color: #FFFFFF;
  :hover {
    cursor: pointer;
  }
`;

const BottomFilterBox = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;
const SearchBar = styled.div`
  margin: 10px 0px 0px 30px;
  width: 500px;
  height: 35px;
  border: 1px solid #B9A89A;
  border-radius: 50px;
  box-sizing: border-box;
  
  display: flex;
`;
const SearchInput = styled.div`
  width: 90%;
  height: 90%;
  margin: 3px 5px 0px 15px;
  input {
    width: 100%;
    height: 100%;
    font-size: 20px;
    line-height: 30px;
    box-sizing: border-box;
    border: none;
  }
  input::placeholder {
    color: #BBBBBB;
  }
  input:focus {
    outline: none;
  }
`;
const SearchImg = styled.div`
  margin: 5px 10px 0px 0px;
  width: 17px;
  height: 17px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    color: #B9A89A;
  }
`;
const StateFilterBox = styled.div`
  margin:10px 35px 0px 0px;
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

// 상품목록 리스트
const ProductListWrapper = styled.div`
  width: 1400px;
  margin:0 auto;
  display: grid;
  grid-template-columns: repeat(2, 675px);
  grid-gap: 50px;
`;
const ProductItem = styled.div`
  width: 675px;
  height: 425px;
  box-sizing: border-box;
  border: 3px solid rgba(185, 168, 154, 0.15);
`;
const ProductItemTop = styled.div`
  margin: 0px;
  width: 100%;
  height: 40px;
  
  background-color: rgba(185, 168, 154, 0.25);
`;
const ProductItemTopInner = styled.div`
  margin: 0px 25px 0px 25px;
  width: 625px;
  height: 30px;
  display: flex;
  justify-content: space-between;
`;
const ProductCategotyCode = styled.div`
  margin: 3px 0px 0px 0px;
  height: 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
`;
const ComnameAndEditAndDelete = styled.div`
  margin: 3px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
`;
const ComnameBox = styled.div`
  margin-right: ${(props) => props.sellState ? "20px" : "0px"};
  height: 30px;

  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #555555;
`;
const EditAndDeleteBox =styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  div {
    color: #000000;
  }
`;
const EditBtn = styled.div`
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`;
const DeleteBtn = styled.div`
  margin-right: 0px;
  :hover {
    cursor: pointer;
  }
`;

const ProductMiddle = styled.div`
  width: 100%;
`;
const ProductMiddleInner = styled.div`
  margin: 20px auto 20px;
  width: 625px;
  height: 130px;

  display: flex;
  justify-content: space-between;

  :hover {
    cursor: pointer;
  }
`;
const ProductMainImg = styled.div`
  margin: 0px 25px 0px 0px;
  width: 130px;
  height: 130px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const ProductInfoBox = styled.div`
  width: 470px;
  height: 130px;
`;
const ProductStateAndDateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductState = styled.div`
  margin: 0px;
  height: 25px;

  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #514438;
  img {
    margin: 0px 10px 0px 0px;
    width: 15px;
    height: 15px;
  }
`;
const ProductDate = styled.div`
  margin: 0px;
  height: 25px;

  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #888888;
`;
const ProductComBox = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 20px;

  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #000000;
`;
const ProductGradeAndNameBox = styled.div`
  margin: 5px 0px 0px 0px;
  width: 100%;
  height: 30px;

  display: flex;
`;
const ProductGrade = styled.div`
  margin: 0px;
  width: 45px;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: #000000;
`;
const ProductName = styled.div`
  margin: 0px;
  width: 90%;
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  color: #000000;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ProductPriceBox = styled.div`
  margin: 10px 0px 0px 0px;
  width: 100%;
  height: 25px;

  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #000000;
`;


const ProductBottom = styled.div`
  width: 100%;
  height: 210px;
  background: rgba(185, 168, 154, 0.05);
`;
const ProductBottomInner = styled.div`
  margin: 0px auto;
  width: 625px;
`;
const ProductDeffectAndGuaranteeBox = styled.div`
  margin: 0px 0px 5px 0px;
  width: 625px;
  height: 50px;

  display: flex;
  justify-content: space-between;
`;
const ProductDeffect = styled.div`
  margin: 20px 0px 0px 0px;
  height: 30px;

  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;
const ProductGuarantee = styled.div`
  margin: 20px 0px 0px 0px;
  height: 30px;

  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #777777;
`;
const ProductDeffectText = styled.div`
  margin: 0px;
  width: 100%;
  height: 30px;

  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #000000;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ProductDeffectImg = styled.div`
  margin: 10px 15px 0px 0px;
  width: 100px;
  height: 100px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

// 페이지
const PageWrap = styled.div`
  height: 30px;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: rgba(81, 68, 56, 0.5);
  margin-top: 50px;
`;

const Page = styled.span`
  color: ${(props) => (props.gray ? "rgba(81, 68, 56, 0.5)" : "rgba(81, 68, 56, 0.8)")};
  margin-right: ${(props) => (props.prev && "20px")};
  margin-left: ${(props) => (props.next && "20px")};
  cursor: ${(props) => ((props.prev || props.next) && !props.gray && "pointer")};
`;