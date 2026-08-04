import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects/Projects";
import Blog from "./pages/Blog/Blog";
import Settings from "./pages/Settings/Settings";
import { useSelector } from "react-redux";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/protectedRoutes";
import Profile from "./pages/Profile/Profile";

function App() {
  const theme = useSelector((state) => state.settings.theme);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div className={theme === "dark" ? "dark" : ""}>
              <AppLayout />
            </div>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
