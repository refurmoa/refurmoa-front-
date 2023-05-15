import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPagePayBid.css";
import prod from "./mypageprod.json";
import { ProductPayment } from "./ProductPayment";
import MemberInfo from "./MemberInfo";

const MyPage_detail = () => {
  const [prodData, setProdData] = useState();

  // const name = window.sessionStorage.getItem("name");
  // const id = window.sessionStorage.getItem("id");

  const postProdData = () => {
    // axios.get(`/api/post/bidprod`)
    // .then((res) => {
    //   const { data } = res;
    //   setProdData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    const data = prod.prodlist;
    setProdData(data);
  };

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

  const day1Ref = useRef();
  const day2Ref = useRef();
  const searchRef = useRef();

  const search_date = () => {
    if (day1Ref.current.value === "" || day1Ref.current.value === undefined) {
      alert("시작 날짜를 정해주세요!!");
      day1Ref.current.focus();
      return false;
    }
    if (day2Ref.current.value === "" || day2Ref.current.value === undefined) {
      alert("끝 날짜를 정해주세요!!");
      day2Ref.current.focus();
      return false;
    }
    // axios
    //   .post("/api/post/searchdate", {
    //     day1: day1Ref.current.value,
    //     day2: day2Ref.current.value,
    //   })
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

  const search_product = () => {
    if (
      searchRef.current.value === "" ||
      searchRef.current.value === undefined
    ) {
      alert("내용을 입력해주세요!!");
      searchRef.current.focus();
      return false;
    }

    // axios
    //   .post("/api/post/seachtext", {
    //     id: searchRef.current.value,
    //   })
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
      <MemberInfo />
      <mid className="mid">
        <div className="payword">결제 내역</div>
        <input className="date" type="date" ref={day1Ref}></input>~
        <input className="date" type="date" ref={day2Ref}></input>
        <input
          className="datesearchbutton"
          type="button"
          value="검색"
          onClick={search_date}
        ></input>
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

      <main className="flex_wrap">
        {prod.prodlist.map((product) => {
          return <ProductPayment product={product} />;
        })}
      </main>
    </div>
  );
};
export default MyPage_detail;
