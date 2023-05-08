import { Route, Routes } from "react-router-dom";
import Login from "./components/sign/signin/Login";
import SignupMain from "./components/sign/signup/SignupMain";
import SignupPhone from "./components/sign/signup/SignupPhone";
import SignupInput from "./components/sign/signup/SignupInput";
import SignupAccept from "./components/sign/signup/SignupAccept";
import SignupComplete from "./components/sign/signup/SignupComplete";
import PostPage from "./components/prodPost/PostPage";
import NoticeMain from "./components/cs/NoticeMain";
import NoticeView from "./components/cs/NoticeView";
import MyPage from "./components/myPage/MyPage";
import MyPagePayment from "./components/myPage/MyPagePayment";
import MyPageBidlist from "./components/myPage/MyPageBidlist";
import Alliance from "./components/company/AllianceForm";
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
        <Route path="/notice" element={<NoticeMain />} />
        <Route path="/notice/detail/:noticeid" element={<NoticeView />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/payment" element={<MyPagePayment />} />
        <Route path="/bidlist" element={<MyPageBidlist />} />
        <Route path="/partnership" element={<Alliance />} />
      </Routes>
    </>
  );
}

export default App;
