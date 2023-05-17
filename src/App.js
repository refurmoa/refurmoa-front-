import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/sign/signin/Login";
import SignupMain from "./components/sign/signup/SignupMain";
import SignupPhone from "./components/sign/signup/SignupPhone";
import SignupInput from "./components/sign/signup/SignupInput";
import SignupAccept from "./components/sign/signup/SignupAccept";
import SignupComplete from "./components/sign/signup/SignupComplete";
import ProductList from "./components/product/ProductList";
import ProductWrite from "./components/product/ProductWrite";
import ProductUpdate from "./components/product/ProductUpdate";
import PostPage from "./components/prodPost/PostPage";
import PostDetail from "./components/prodPost/PostDetail/PostDetail";
import PostPay from "./components/Pay/PostPay";
import PayDetail from "./components/myPage/MyPagePayDetail";
import NoticeList from "./components/cs/notice/NoticeList";
import NoticeView from "./components/cs/notice/NoticeView";
import NoticePost from "./components/cs/notice/NoticePost";
import FAQ from "./components/cs/FAQ/FAQ";
import FAQWrite from "./components/cs/FAQ/FAQWrite";
import FAQUpdate from "./components/cs/FAQ/FAQUpdate";
import OneononeInquiry from "./components/cs/oneonone/OneononeInquiry";
import OneononeDetail from "./components/cs/oneonone/OneononeDetail";
import OneononeUserpost from "./components/cs/oneonone/OneononeUserpost";
import AsStore from "./components/cs/asStore/AsStore";
import AsStoreWrite from "./components/cs/asStore/AsStoreWrite";
import AsStoreUpdate from "./components/cs/asStore/AsStoreUpdate";
import MyPageBookmarkList from "./components/myPage/MyPageBookmarkList";
import UserUpdate from "./components/myPage/userUpdate/UserUpdate";
import MyPagePayment from "./components/myPage/MyPagePayment";
import MyPageBidlist from "./components/myPage/MyPageBidlist";
import Alliance from "./components/company/AllianceForm";
import CsNavbar from "./components/cs/CsNavbar";
import AdminUserDetail from "./components/adminPage/AdminUserDetail";
import AdminPartnerDetail from "./components/adminPage/AdminPartnerDetail";

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
        <Route path="/prod" element={<ProductList />} />
        <Route path="/prod/write" element={<ProductWrite />} />
        <Route path="/prod/update" element={<ProductUpdate />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/detail/:board_num" element={<PostDetail />} />
        <Route path="/post/pay" element={<PostPay />} />
        <Route element={<CsNavbar />}>
          <Route path="/cs/notice" element={<NoticeList />} />
          <Route path="/cs/notice/detail/:noticeid" element={<NoticeView />} />
          <Route path="/cs/notice/write" element={<NoticePost />} />
          <Route path="/cs/faq" element={<FAQ />} />
          <Route path="/cs/faq/write" element={<FAQWrite />} />
          <Route path="/cs/faq/update" element={<FAQUpdate />} />
          <Route path="/cs/inquiry" element={<OneononeInquiry />} />
          <Route path="/cs/inquiry/detail" element={<OneononeDetail />} />
          <Route path="/cs/inquiry/write" element={<OneononeUserpost />} />
          <Route path="/cs/as_store" element={<AsStore />} />
          <Route path="/cs/as_store/write" element={<AsStoreWrite />} />
          <Route path="/cs/as_store/update" element={<AsStoreUpdate />} />
        </Route>
        <Route path="/mypage" element={<MyPageBookmarkList />} />
        <Route path="/userupdate" element={<UserUpdate />} />
        <Route path="/mypage/payment" element={<MyPagePayment />} />
        <Route path="/payment/detail/:board_num" element={<PayDetail />} />
        <Route path="/mypage/bidlist" element={<MyPageBidlist />} />
        <Route path="/partnership" element={<Alliance />} />
        <Route path="/admin/user/detail" element={<AdminUserDetail />} />
        <Route path="/admin/partner/detail" element={<AdminPartnerDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
