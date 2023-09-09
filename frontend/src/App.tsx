import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/Register";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Login } from "./page/Login";
import { MessageContainer } from "./components/MessageContainer";

export const App: FC = () => {
  return (
    <>
      <Navbar />
      <MessageContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
