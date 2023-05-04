import { useEffect } from "react";
import axios from "axios";
import "./main.css";
import { Product } from "./product";
import member from "./images/member.png";
import card from "./images/card.png";
import list from "./images/list.png";
import star from "./images/star.png";

export const Main = ({ products, setProducts }) => {
  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);

  return (
    <>
      <div className="main1">
        <div>
          <div className="user-wrap">
            <div>
              <img alt="" src={member} />
            </div>
            <div className="user-text">
              <p>GOLD</p>
            </div>
            <div className="user-text3">이모아(leemoa)</div>
          </div>
          <button className="button">개인정보 수정</button>
        </div>
        <div className="user-wrap">
          <div className="user-text3">결제 · 배송</div>
          <div>
            <img alt="" src={card} />
          </div>
          <div className="user-text2">
            <p>2</p>
          </div>
        </div>
        <div className="user-wrap">
          <div className="user-text3">입찰 내역</div>
          <div>
            <img alt="" src={list} />
          </div>
          <div className="user-text2">
            <p>13</p>
          </div>
        </div>
        <div className="user-wrap">
          <div className="user-text3">찜한 상품</div>
          <div>
            <img alt="" src={star} />
          </div>
          <div className="user-text2">
            <p>4</p>
          </div>
        </div>
      </div>
      <div className="main2">
        <span className="user-text3">입찰 내역 &nbsp;&nbsp;&nbsp;</span>
        <div>
          <input type="radio" name="month"></input>
          <label>전체</label>
        </div>
        <div>
          <input type="radio" name="month"></input>
          <label>진행중</label>
        </div>
        <div>
          <input type="radio" name="month"></input>
          <label>종료</label>
        </div>
        <div>
          <select>
            <option value="3">3개월</option>
            <option value="6">6개월</option>
            <option value="12">12개월</option>
          </select>
        </div>
        <div>
          <input type="text"></input>
          <input type="button" value="검색"></input>
        </div>
      </div>
      <main className="flex_wrap">
        {products.map((product) => {
          return <Product product={product} />;
        })}
      </main>
    </>
  );
};
