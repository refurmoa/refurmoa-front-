import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/sign/signin/Login";
import SignupMain from "./components/sign/signup/SignupMain";
import SignupPhone from "./components/sign/signup/SignupPhone";
import SignupInput from "./components/sign/signup/SignupInput";
import SignupAccept from "./components/sign/signup/SignupAccept";
import SignupComplete from "./components/sign/signup/SignupComplete";
import ProductWrite from "./components/product/ProductWrite";
import ProductUpdate from "./components/product/ProductUpdate";
import PostPage from "./components/prodPost/PostPage";
import PostDetail from "./components/prodPost/PostDetail/PostDetail";
import PostPay from "./components/Pay/PostPay";
import NoticeList from "./components/cs/notice/NoticeList";
import NoticeView from "./components/cs/notice/NoticeView";
import AsStore from "./components/cs/asStore/AsStore";
import MyPageBookmarkList from "./components/myPage/MyPageBookmarkList";
import UserUpdate from "./components/myPage/userUpdate/UserUpdate";
import MyPagePayment from "./components/myPage/MyPagePayment";
import MyPageBidlist from "./components/myPage/MyPageBidlist";
import Alliance from "./components/company/AllianceForm";
import CsNavbar from "./components/cs/CsNavbar";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupMain />} />
        <Route path="/signup/1" element={<SignupPhone />} />
        <Route path="/signup/2" element={<SignupInput />} />
        <Route path="/signup/3" element={<SignupAccept />} />
        <Route path="/signup/4" element={<SignupComplete />} />
        <Route path="/prod/write" element={<ProductWrite />} />
        <Route path="/prod/update" element={<ProductUpdate />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/detail/:board_num" element={<PostDetail />} />
        <Route path="/post/pay/:board_num" element={<PostPay />} />
        <Route element={<CsNavbar />}>
          <Route path="cs/notice" element={<NoticeList />} />
          <Route path="cs/notice/detail/:noticeid" element={<NoticeView />} />
        </Route>
        <Route path="/cs/as_store" element={<AsStore />} />
        <Route path="/mypage" element={<MyPageBookmarkList />} />
        <Route path="/userupdate" element={<UserUpdate />} />
        <Route path="/mypage/payment" element={<MyPagePayment />} />
        <Route path="/mypage/bidlist" element={<MyPageBidlist />} />
        <Route path="/partnership" element={<Alliance />} />
      </Route>
    </Routes>
  );
}

export default App;
