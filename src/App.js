import { Route, Routes } from "react-router-dom";
import Login from "./components/sign/signin/Login";
import SignupMain from "./components/sign/signup/SignupMain";
import SignupPhone from "./components/sign/signup/SignupPhone";
import SignupInput from "./components/sign/signup/SignupInput";
import SignupAccept from "./components/sign/signup/SignupAccept";
import SignupComplete from "./components/sign/signup/SignupComplete";
import PostPage from "./components/prodPost/PostPage";

import PostDetail from "./components/prodPost/PostDetail/PostDetail";
import NoticeList from "./components/cs/NoticeList";
import NoticeView from "./components/cs/NoticeView";
import MyPageBookmarkList from "./components/myPage/MyPageBookmarkList";
import MyPagePayment from "./components/myPage/MyPagePayment";
import MyPageBidlist from "./components/myPage/MyPageBidlist";
import Alliance from "./components/company/AllianceForm";
import UserUpdate from "./components/userUpdate/UserUpdate";

import PostWrite from "./components/prodPost/PostWrite/PostWrite";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupMain />} />
        <Route path="/signup/1" element={<SignupPhone />} />
        <Route path="/signup/2" element={<SignupInput />} />
        <Route path="/signup/3" element={<SignupAccept />} />
        <Route path="/signup/4" element={<SignupComplete />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/detail/:board_num" element={<PostDetail />} />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/notice/detail/:noticeid" element={<NoticeView />} />
        <Route path="/mypage" element={<MyPageBookmarkList />} />
        <Route path="/userupdate" element={<UserUpdate />} />
        <Route path="/payment" element={<MyPagePayment />} />
        <Route path="/mypage/bidlist" element={<MyPageBidlist />} />
        <Route path="/partnership" element={<Alliance />} />
        <Route path="/post/write" element={<PostWrite />} />
      </Routes>
    </>
  );
}

export default App;
