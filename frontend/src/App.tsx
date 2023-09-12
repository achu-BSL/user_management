import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/Register";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Login } from "./page/Login";
import { MessageContainer } from "./components/MessageContainer";
import { Home } from "./page/Home";
import { Profile } from "./page/Profile";
import { Dashboard } from "./page/Dashboard";

export const App: FC = () => {
  return (
    <>
      <Navbar />
      <MessageContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};
