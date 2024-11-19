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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="/user/:username" element={<UserNamePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="test" element={<ComponentTest />} />
            <Route path="streamManager" element={<StreamManager />} />
            <Route path="following" element={<Following />} />
            <Route path="accountSetting" element={<AccountSetting />} />
          </Route>
          <Route path="searchResult" element={<SearchResult />} />
          <Route path="browsing" element={<Browsing />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
