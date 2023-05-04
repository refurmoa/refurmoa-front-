import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import NoticeView from "./components/cs/NoticeView";
import NoticeMain from "./components/cs/NoticeMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<NoticeMain />} />

          <Route path="/notice/detail/:noticeid" element={<NoticeView />} />
          <Route path="/notice" element={<NoticeMain />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
