import React from "react";
import { BrowserRouter, Route, Routes as Routess } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/Menu";

function Routes() {
  return (
    <BrowserRouter>
      <Routess>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routess>
    </BrowserRouter>
  );
}

export default Routes;
