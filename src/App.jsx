import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Nav from "./components/Nav/Nav";
import { useReducer } from "react";
import AppLayout from "./components/AppLayout";
import { UserProvider, useUser } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="friends" element={<Friends />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
