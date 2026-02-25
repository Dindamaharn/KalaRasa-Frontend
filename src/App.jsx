import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/splash/Splash";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/user/Home";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Profile from "./pages/user/Profile";
import Bookmark from "./pages/user/Bookmark";
import History from "./pages/user/History";
import Shopping from "./pages/user/Shopping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/bookmark" element={<Bookmark />} />
        <Route path="/user/history" element={<History />} />
        <Route path="/user/shopping" element={<Shopping />} />
        <Route path="/admin/home" element={<HomeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;