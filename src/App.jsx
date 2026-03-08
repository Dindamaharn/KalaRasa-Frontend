import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Splash from "./pages/splash/Splash";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/user/Home";
import HomeAdmin from "./pages/admin/HomeAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import DetailUsers from "./pages/admin/DetailUsers";
import SubmissionDetail from "./pages/admin/SubmissionDetail";
import Profile from "./pages/user/Profile";
import Bookmark from "./pages/user/Bookmark";
import History from "./pages/user/History";
import Shopping from "./pages/user/Shopping";
import Recipes from "./pages/user/Recipes";
import DetailRecipes from "./pages/user/DetailRecipes";
import EditProfile from "./pages/user/EditProfile";
import AddRecipes from "./pages/user/AddRecipes";
import AddShopping from "./pages/user/AddShopping";
import RecipesAdmin from "./pages/admin/RecipesAdmin";
import AddRecipesAdmin from "./pages/admin/AddRecipes";
import SubmissionRecipes from "./pages/admin/SubmissionRecipes";
import UpdateRecipeAdmin from "./pages/admin/UpdateRecipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/history" element={<History />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<DetailRecipes />} />
        <Route path="/add-recipes" element={<AddRecipes />} />
        <Route path="/add-shopping" element={<AddShopping />} />

        {/* Admin */}
        <Route path="/admin/home"
          element={<ProtectedRoute role="admin"> <HomeAdmin /></ProtectedRoute>}
        />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/users/:id" element={<DetailUsers />} />
        <Route path="/admin/recipes" element={<RecipesAdmin />} />
        <Route path="/admin/submissions/:id" element={<SubmissionDetail />} />
        <Route path="/admin/submissions" element={<SubmissionRecipes />} />
        <Route path="/admin/add-recipe" element={<AddRecipesAdmin />} />
        <Route path="/admin/recipes/:id" element={<UpdateRecipeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;