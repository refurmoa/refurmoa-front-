import React, { useEffect, useRef, useState } from "react";

// 컴포넌트
import MemberInfo from "./MemberInfo";
import GradeMileCoupon from "./GradeMileCoupon";
import BookmarkList from "./BookmarkList";

const MyPageBookmarkList = () => {
  
  return (
    <>
    {/* 개인정보(수정), 결제·배송, 입찰 내역, 찜한 상품 */}
    <MemberInfo />
    {/* 회원등급, 마일리지, 쿠폰 */}
    <GradeMileCoupon />
    {/* 찜한상품 */}
    <BookmarkList />
    </>
  );
};

export default MyPageBookmarkList;