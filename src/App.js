import { Route, Routes } from "react-router-dom";
import PostPage from "./components/prodPost/PostPage";
import MyPage from "./components/myPage/MyPage";
import Header from "./components/headerNfooter/Header";
import Login from "./components/sign/signin/Login";
import SignupMain from "./components/sign/signup/SignupMain";
import SignupPhone from "./components/sign/signup/SignupPhone";
import SignupInput from "./components/sign/signup/SignupInput";
import SignupAccept from "./components/sign/signup/SignupAccept";
import SignupComplete from "./components/sign/signup/SignupComplete";
import NoticeView from "./components/cs/NoticeView";
import NoticeMain from "./components/cs/NoticeMain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/post" element={<PostPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignupMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/2" element={<SignupPhone />} />
        <Route path="/signup/3" element={<SignupInput />} />
        <Route path="/signup/4" element={<SignupAccept />} />
        <Route path="/signup/5" element={<SignupComplete />} />
        <Route path="/notice" element={<NoticeMain />} />
        <Route path="/notice/detail/:noticeid" element={<NoticeView />} />
      </Routes>
    </>
  )

  
}

export default App;
