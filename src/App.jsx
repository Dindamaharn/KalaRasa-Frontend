import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Splash from "./pages/splash/Splash";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import Bookmark from "./pages/user/Bookmark";
import History from "./pages/user/History";
import Shopping from "./pages/user/Shopping";
import ShoppingDetail from "./pages/user/ShoppingDetail";
import Recipes from "./pages/user/Recipes";
import DetailRecipes from "./pages/user/DetailRecipes";
import EditProfile from "./pages/user/EditProfile";
import ResetPassword from "./pages/user/ResetPassword";
import AddRecipes from "./pages/user/AddRecipes";
import EditRecipes from "./pages/user/EditRecipes";
import AddShopping from "./pages/user/AddShopping";

import HomeAdmin from "./pages/admin/HomeAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import DetailUsers from "./pages/admin/DetailUsers";
import SubmissionDetail from "./pages/admin/SubmissionDetail";
import RecipesAdmin from "./pages/admin/RecipesAdmin";
import AddRecipesAdmin from "./pages/admin/AddRecipes";
import SubmissionRecipes from "./pages/admin/SubmissionRecipes";
import UpdateRecipeAdmin from "./pages/admin/UpdateRecipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* SPLASH */}
        <Route path="/" element={<Splash />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC (GUEST BOLEH) */}
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<DetailRecipes />} />
        <Route path="/shopping" element={<Shopping />} />

        {/* USER (HARUS LOGIN) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>
              <Bookmark />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shopping/:id"
          element={
            <ProtectedRoute>
              <ShoppingDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-recipes"
          element={
            <ProtectedRoute>
              <AddRecipes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-recipe/:id"
          element={
            <ProtectedRoute>
              <EditRecipes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-shopping"
          element={
            <ProtectedRoute>
              <AddShopping />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute role="admin">
              <HomeAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UsersAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute role="admin">
              <DetailUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recipes"
          element={
            <ProtectedRoute role="admin">
              <RecipesAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/submissions"
          element={
            <ProtectedRoute role="admin">
              <SubmissionRecipes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/submissions/:id"
          element={
            <ProtectedRoute role="admin">
              <SubmissionDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-recipe"
          element={
            <ProtectedRoute role="admin">
              <AddRecipesAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/recipes/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateRecipeAdmin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;