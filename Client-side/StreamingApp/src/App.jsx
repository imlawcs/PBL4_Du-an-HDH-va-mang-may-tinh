import Browsing from "./pages/Browsing";
import Following from "./pages/Following";
import Home from "./pages/Home";
import StreamManager from "./pages/streamManager";
import UserNamePage from "./pages/UserNamePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountSetting from "./pages/AccountSetting";
import Category from "./pages/Category";
import SearchResult from "./pages/SearchResult";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import ComponentTest from "./pages/ComponentTest";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Blocked from "./pages/Blocked";
import TagPage from "./pages/TagPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="category/:categoryid" element={<Category />} />
          <Route path="tag/:tagid" element={<TagPage />} />
          <Route path="/user/:username" element={<UserNamePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="test" element={<ComponentTest />} />
            <Route path="streamManager" element={<StreamManager />} />
            <Route path="following" element={<Following />} />
            <Route path="accountSetting" element={<AccountSetting />} />
            <Route path="blocked" element={<Blocked />} />
          </Route>
          <Route path="searchResult" element={<SearchResult />} />
          <Route path="browsing" element={<Browsing />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
