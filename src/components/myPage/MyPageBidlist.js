import member from "../../images/member.png";
import card from "../../images/card.png";
import list from "../../images/list.png";
import star from "../../images/star.png";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductBidlist } from "./ProductBidlist";
import axios from "axios";

const MyPage_detail = () => {
  const [prodbidlistData, setProdData] = useState();

  // const name = window.sessionStorage.getItem("name");
  // const id = window.sessionStorage.getItem("id");

  // const postbidlistData = () => {
  //   axios
  //     .get(`/api/post/bidlist`)
  //     .then((res) => {
  //       const { data } = res;
  //       setProdData(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  //   const data = prod.prodlist;
  //   setProdbidlistData(data);
  // };

  //  useEffect(() => {
  //   axios
  //   .all([axios("/api/countpay"), axios("/api/countbid"), axios("api/countlike")])
  //   .then(
  //     axios.spread((res1, res2, res3) => {
  //       console.log(res1, res2, res3);
  //     })
  //   )
  //   .catch((err) => console.log(err));
  //  },[]);

  const searchRef = useRef();

  const search_product = () => {
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      alert("내용을 입력해주세요!!");
      searchRef.current.focus();
      return false;
    }
  };

  const search_all = () => {
    // axios
    //   .post(`/api/post/searchall`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_ing = () => {
    // axios
    //   .post(`/api/post/searching`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_done = () => {
    // axios
    //   .post(`/api/post/searchdone`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_3 = () => {
    // axios
    //   .post(`/api/post/threesearch`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_6 = () => {
    // axios
    //   .post(`/api/post/sixsearch`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  const search_9 = () => {
    // axios
    //   .post(`/api/post/ninesearch`)
    //   .then((res) => {
    //     const { data } = res;
    //     setProdData(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // const data = prod.prodlist;
    // setProdbidlistData(data);
  };

  return (
    <div>
      <top className="top">
        <member className="membertop">
          {/* <div className="membertext">{prodbidlistData}</div>
          {prodbidlistData >= 10 ? (
            <div className="membertext">BRONZE</div>
          ) : prodbidlistData >= 30 ? (
            <div className="membertext">SILVER</div>
          ) : prodbidlistData >= 60 ? (
            <div className="membertext">GOLD</div>
          ) : prodbidlistData >= 100 ? (
            <div className="membertext">VIP</div>
          ) : (
            <div>BABY</div>
          )} */}
          <Link to="/mypage">
            <div className="membertext">GOLD</div>
            <img alt="" src={member} />
            <div className="membername">이모아(leemoa)</div>
            {/* <div className="membername">{name}{(id)}</div> */}
          </Link>
          <Link to="/mypage/userupdate">
            <button>개인정보 수정</button>
          </Link>
        </member>
        <line className="borderright"></line>
        <payment className="resttop">
          <Link to="/payment">
            <div className="resttext">결제 · 배송</div>
            <div className="restnumber1">2</div>
            {/* <div className="restnumber1">{res1}</div> */}
            <img alt="" src={card} />
          </Link>
        </payment>
        <line className="borderright"></line>
        <bidlist className="resttop">
          <div className="resttext">입찰 내역</div>
          <div className="restnumber2">13</div>
          {/* <div className="restnumber1">{res2}</div> */}
          <img alt="" src={list} />
        </bidlist>
        <line className="borderright"></line>
        <liked className="resttop">
          <Link to="/mypage">
            <div className="resttext">찜한 상품</div>
            <div className="restnumber1">4</div>
            {/* <div className="restnumber1">{res3}</div> */}
            <img alt="" src={star} />
          </Link>
        </liked>
      </top>
      <mid className="mid">
        <div className="payword">입찰 내역</div>
        <radio className="radio">
          <input type="radio" name="month"></input>
          <label onClick={search_all}>전체</label>

          <input type="radio" name="month"></input>
          <label onClick={search_ing}>진행중</label>

          <input type="radio" name="month"></input>
          <label onClick={search_done}>종료</label>
        </radio>
        <select className="option">
          <option value="3" onChange={search_3}>
            3개월
          </option>
          <option value="6" onChange={search_6}>
            6개월
          </option>
          <option value="12" onChange={search_9}>
            12개월
          </option>
        </select>
        <span className="wordsearchpart">
          <input className="searchbox" type="text" ref={searchRef}></input>
          <input
            className="searchboxbutton"
            type="button"
            value=""
            onClick={search_product}
          ></input>
        </span>
      </mid>

      <div className="flex_wrap">
        {prod.prodlist.map((product) => {
          return <ProductBidlist product={product} />;
        })}
      </div>
    </div>
  );
};
export default MyPage_detail;
