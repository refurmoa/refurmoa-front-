// 메인 페이지

import "./Main.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListScroll from "react-scroll-horizontal";
import { getDdayArray } from "../shared/Timer";
import menuImage1 from "../../images/main_menu_image1.jpg";
import menuImage2 from "../../images/main_menu_image2.jpg";
import menuImage3 from "../../images/main_menu_image3.jpg";
import data from "./MainItems.json";
import axios from "axios";

// axios 메인배너/광고배너 data
// 신상품 경매/즉시구매, 개수, 
// 인기상품 조회수
// 마감임박상품 data 경매
// 조회수up
// 판매완료 상품X
function Main() {
    const navigate = useNavigate();
    const [mainBanner, setMainBanner] = useState([]); // 메인 배너 data
    const [newItemList, setNewItemList] = useState([]); // 신상품 data
    const [bestItemList, setBestItemList] = useState([]); // 인기상품 data
    const [deadlineItemList, setDeadlineItemList] = useState([]); // 마감임박상품 data
    const [adBanner, setAdBanner] = useState([]); // 광고 배너 data
    const [mainBannerSlide, setMainBannerSlide] = useState(0); // 현재 메인 배너(슬라이드)
    const [adBannerSlide, setAdBannerSlide] = useState(0); // 현재 광고 배너(슬라이드)
    const [menuHover, setMenuHover] = useState(0); // 카테고리 이름 출력
    const [now, setNow] = useState(new Date().getTime()); // 현재 날짜(ms)

    useEffect(() => {
        axios
        .get(`/main/item`)
        .then((res) => {
            console.log(res.data);
            setBestItemList(res.data[0]);
            setNewItemList(res.data[1]);
            setDeadlineItemList(res.data[2]);
        })
        .catch((e) => {
        console.error(e);
        })
        axios
        .get(`/main/banner`)
        .then((res) => {
            console.log(res.data);
            setMainBanner(res.data);
        })
        .catch((e) => {
        console.error(e);
        })
        axios
        .get(`/main/banner/ad`)
        .then((res) => {
            console.log(res.data);
            setAdBanner(res.data);
        })
        .catch((e) => {
        console.error(e);
        })
        
        // 상품 타이머 > 1초마다 리렌더링
        const countdown = setInterval(() => {
            setNow(new Date().getTime());
            getDday();
        }, 1000);
        return () => { clearInterval(countdown); };
    }, [])

    useEffect(() => { // 메인 배너 타이머
        const bannerTimer = setTimeout(() => {
            setMainBannerSlide((prevSlide) => (prevSlide === mainBanner.length - 1 ? 0 : prevSlide + 1));
        }, 2000);
        return () => clearTimeout(bannerTimer);
    }, [mainBannerSlide, mainBanner.length]);

    // 배너 변경 화살표 클릭
    const handleMainBanner = (e, direction) => {
        e.stopPropagation();
        if (direction === "prev") {
          setMainBannerSlide(prevSlide => (prevSlide === 0 ? mainBanner.length - 1 : prevSlide - 1));
        } else if (direction === "next") {
          setMainBannerSlide(prevSlide => (prevSlide === mainBanner.length - 1 ? 0 : prevSlide + 1));
        }
    };

    // 상품 상세 페이지로 이동 & 조회수
    const moveDetail = (num) => {
        
        navigate(`/post/detail/${num}`);
    }

    // 타이머
    const getDday = (start_date, end_date) => {
        const date = new Date(start_date) > new Date() ? new Date(start_date) : new Date(end_date);
        const {day, hours, minutes, seconds} = getDdayArray(Date.parse(date));
        const red = day === 0 && hours < 12 ? true : false;
        return (
            <div className="M-item_timer_wrap">
                <svg className={`M-item_timer_icon ${red && "M-item_timer_icon_red"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/>
                </svg>
                <span className={`M-item_timer_text ${red && "M-item_timer_text_red"}`}>
                    {day !== 0 && `${day}일 `}{hours !== 0 && `${hours}시간 `}
                    {minutes !== 0 && `${minutes}분 `}{seconds !== 0 && `${seconds}초 `}
                </span>
            </div>
        );
    };

    // 리스트 출력
    const printMap = (list) => {
        return (
            <span className="M-item_box" onClick={(e) => moveDetail(list.board_num)} key={list.board_num}>
                <div className="M-item_img_wrap">
                    <img className="M-item_img" alt={list.prod_name} src={`/images/prod/${list.main_image}`} />
                    <div className="M-item_selltype_wrap">
                        { (list.sell_type === 1 || list.sell_type === 3) &&
                            <span className={`M-item_selltype ${new Date(list.start_date) > new Date() && "M-item_selltype_black"}`}>경매</span> }
                        { (list.sell_type === 2 || list.sell_type === 3) &&
                            <span className={`M-item_selltype ${new Date(list.start_date) > new Date() && "M-item_selltype_black"}`}>즉시구매</span> }
                    </div>
                    {new Date(list.start_date) > new Date() &&
                        <div className="M-item_img_black">경매 오픈 예정</div> }
                </div>
                <div className="M-item_text_wrap">
                    { list.sell_type !== 2 ? getDday(list.start_date, list.end_date)
                        : <div className="M-item_timer_wrap"><hr className="M-item_timer_none"/></div> }
                    <div className="M-item_name"><span>{list.prod_com}</span> {list.prod_name}</div>
                    <div className="M-item_price">
                        <span className="M-item_price_left">
                            <div className="M-item_org_price">{list.orgPrice?.toLocaleString('ko-KR')}</div>
                            <div className="M-item_pay_price">
                                {list.sell_type === 2 ? list.directPrice?.toLocaleString('ko-KR'): list.curPrice?.toLocaleString('ko-KR')}
                            </div>
                        </span>
                        { list.sell_type === 3 &&
                            <span className="M-item_price_right">
                                <div className="M-item_direct_price">즉시구매가</div>
                                <div className="M-item_pay_price">{list.directPrice?.toLocaleString('ko-KR')}</div>
                            </span>
                        }
                    </div>
                </div>
            </span>
        )
    }
    

    return ( <>
        {/* 메인 배너 */}
        <div className="M-banner">
            <svg className="M-banner_arrow M-banner_arrow_left" onClick={(e) => {handleMainBanner(e, "prev")}}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            { mainBanner?.map((banner, index) => (
                <Link to={banner.bannLink} key={index}>
                    <img className={`M-banner_img ${index === mainBannerSlide && "M-banner_img_active"}`}
                        alt="메인배너이미지" src={`/images/banner/${banner.bannImage}`} />
                </Link>
            ))}
            <svg className="M-banner_arrow M-banner_arrow_right" onClick={(e) => {handleMainBanner(e, "next")}}
                xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        </div>

        {/* 메뉴 */}
        <div className="M-order_menu_back">
            <div className="M-order_menu_wrap">
                <span className="M-order_menu" onMouseEnter={() => {setMenuHover(1)}} onMouseLeave={() => {setMenuHover(0)}}>
                    <img className="M-order_menu_img" alt="all" src={menuImage1} />
                    { menuHover === 1 &&
                        <Link to="/post?category=all" className="M-order_menu_text">all</Link> }
                </span>
                <span className="M-order_menu" onMouseEnter={() => {setMenuHover(2)}} onMouseLeave={() => {setMenuHover(0)}}>
                    <img className="M-order_menu_img" alt="appliance" src={menuImage2} />
                    { menuHover === 2 &&
                        <Link to="/post?category=appliance" className="M-order_menu_text">appliance</Link> }
                </span>
                <span className="M-order_menu" onMouseEnter={() => {setMenuHover(3)}} onMouseLeave={() => {setMenuHover(0)}}>
                    <img className="M-order_menu_img" alt="furniture" src={menuImage3} />
                    { menuHover === 3 &&
                        <Link to="/post?category=furniture" className="M-order_menu_text">furniture</Link> }
                </span>
            </div>
        </div>

        {/* NEW ITEMS */}
        <div className="M-items_wrap">
            <div className="M-items_title">NEW ITEMS</div>
            <div className="M-items_list">
                { newItemList.length <= 4 ? newItemList?.map((list) => printMap(list))
                : <ListScroll reverseScroll = { true }>
                    {newItemList?.map((list) => printMap(list))}
                </ListScroll> }
            </div>
        </div>

        {/* BEST ITEMS */}
        <div className="M-best_items_wrap">
            <div className="M-items_back"></div>
            <div className="M-items_wrap">
                <div className="M-items_title">BEST ITEMS</div>
                <div className="M-items_list">
                    { bestItemList.length <= 4 ? bestItemList?.map((list) => printMap(list))
                    : <ListScroll reverseScroll = { true }>
                        {bestItemList?.map((list) => printMap(list))}
                    </ListScroll> }
                </div>
            </div>
        </div>

        {/* 마감 임박 상품 */}
        <div className="M-items_wrap">
            <div className="M-items_title">마감 임박 상품</div>
            <div className="M-items_list">
                { deadlineItemList.length <= 4 ? deadlineItemList?.map((list) => printMap(list))
                : <ListScroll reverseScroll = { true }>
                    {deadlineItemList?.map((list) => printMap(list))}
                </ListScroll> }
            </div>
        </div>

        {/* 하단 광고 배너 */}
        <div className="M-ad_banner_wrap">
            <div className="M-ad_banner">
                { adBanner?.map((banner, index) => (
                    <Link to={banner.bannLink} className="M-ad_banner_img_wrap" key={index}>
                        <img className="M-ad_banner_img" alt="광고배너이미지" src={`/images/banner/${banner.bannImage}`} />
                    </Link>
                ))}
            </div>
        </div>
        
    </> )
};

export default Main;



