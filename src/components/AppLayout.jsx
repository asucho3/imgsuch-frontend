import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import { useState } from "react";

function AppLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default AppLayout;
