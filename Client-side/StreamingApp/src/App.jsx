import Browsing from "./pages/Browsing";
import Following from "./pages/Following";
import Home from "./pages/Home";
import StreamManager from "./pages/streamManager";
import UserNamePage from "./pages/UserNamePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountSetting from "./pages/AccountSetting";
import Category from "./pages/Category";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="category" element={<Category />} />
        <Route path="streamManager" element={<StreamManager />} />
        <Route path="/user/:username" element={<UserNamePage />} />
        <Route path="following" element={<Following />} />
        <Route path="browsing" element={<Browsing />} />
        <Route path="accountSetting" element={<AccountSetting />} />
        <Route path="searchResult" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
