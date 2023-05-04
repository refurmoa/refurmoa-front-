import { Route, Routes } from "react-router-dom";
import PostPage from "./components/prodPost/PostPage";
import MyPage from "./components/my_page/MyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/post" element={<PostPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  )

  
}

export default App;
