import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./components/refurmoa/Main";
import Login from "./components/sign/signin/Login";
import Signup from "./components/sign/signup/Signup";
import ProductList from "./components/product/ProductList";
import ProductWrite from "./components/product/ProductWrite";
import ProductUpdate from "./components/product/ProductUpdate";
import PostPage from "./components/prodPost/PostPage";
import PostDetail from "./components/prodPost/PostDetail/PostDetail";
import PostWrite from "./components/prodPost/PostWrite/PostWrite";
import PostUpdate from "./components/prodPost/PostWrite/PostUpdate";
import PostPay from "./components/Pay/PostPay";
import PayDetail from "./components/Pay/PayDetail";
import CsNavbar from "./components/cs/CsNavbar";
import NoticeList from "./components/cs/notice/NoticeList";
import NoticeView from "./components/cs/notice/NoticeView";
import NoticePost from "./components/cs/notice/NoticePost";
import FAQ from "./components/cs/FAQ/FAQ";
import FAQWrite from "./components/cs/FAQ/FAQWrite";
import OneononeInquiry from "./components/cs/oneonone/OneononeInquiry";
import OneononeDetail from "./components/cs/oneonone/OneononeDetail";
import OneononeUserpost from "./components/cs/oneonone/OneononeUserpost";
import AsStore from "./components/cs/asStore/AsStore";
import AsStoreAdmin from "./components/cs/asStore/AsStoreAdmin";
import MyPageBookmarkList from "./components/myPage/MyPageBookmarkList";
import UserUpdate from "./components/myPage/UserUpdate";
import MyPagePayment from "./components/myPage/MyPagePayment";
import MyPageBidList from "./components/myPage/MyPageBidList";
import AdminNavi from "./components/adminPage/AdminNavi";
import Admin from "./components/adminPage/Admin";
import AdminOrder from "./components/adminPage/order/AdminOrder";
import AdminUser from "./components/adminPage/user/AdminUser";
import AdminUserDetail from "./components/adminPage/user/AdminUserDetail";
import AdminPartner from "./components/adminPage/partner/AdminPartner";
import AdminPartnerDetail from "./components/adminPage/partner/AdminPartnerDetail";
import AdminBanner from "./components/adminPage/banner/AdminBanner";
import AdminBannerWrite from "./components/adminPage/banner/AdminBannerWirte";
import Alliance from "./components/company/AllianceForm";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/prod" element={<ProductList />} />
        <Route path="/prod/write" element={<ProductWrite />} />
        <Route path="/prod/update/:product_code" element={<ProductUpdate />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/:search" element={<PostPage />} />
        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/post/update/:board_num" element={<PostUpdate />} />
        <Route path="/post/detail/:board_num" element={<PostDetail />} />
        <Route path="/post/pay/:board_num" element={<PostPay />} />
        <Route path="/payment/detail/:board_num" element={<PayDetail />} />
        <Route element={<CsNavbar />}>
          <Route path="/cs/notice" element={<NoticeList />} />
          <Route path="/cs/notice/detail" element={<NoticeView />} />
          <Route path="/cs/notice/write" element={<NoticePost />} />
          <Route path="/cs/faq" element={<FAQ />} />
          <Route path="/cs/faq/write" element={<FAQWrite />} />
          <Route path="/cs/faq/update" element={<FAQWrite />} />
          <Route path="/cs/inquiry" element={<OneononeInquiry />} />
          <Route path="/cs/inquiry/detail" element={<OneononeDetail />} />
          <Route path="/cs/inquiry/write" element={<OneononeUserpost />} />
          <Route path="/cs/as" element={<AsStore />} />
          <Route path="/cs/as/admin" element={<AsStoreAdmin />} />
        </Route>
        <Route path="/user/update" element={<UserUpdate />} />
        <Route path="/mypage" element={<MyPageBookmarkList />} />
        <Route path="/mypage/payment" element={<MyPagePayment />} />
        <Route path="/mypage/bidlist" element={<MyPageBidList />} />
        <Route element={<AdminNavi />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/admin/user/detail" element={<AdminUserDetail />} />
          <Route path="/admin/partner" element={<AdminPartner />} />
          <Route
            path="/admin/partner/detail"
            element={<AdminPartnerDetail />}
          />
          <Route path="/admin/banner" element={<AdminBanner />} />
          <Route path="/admin/banner/write" element={<AdminBannerWrite />} />
        </Route>
        <Route path="/partnership" element={<Alliance />} />
      </Route>
    </Routes>
  );
}

export default App;
