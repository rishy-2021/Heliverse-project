import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { NavBar } from "./components/nav-bar";
import { Users } from "./pages/users";
import { Tables } from "./pages/tables";

const AppRoute: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='users' element={<Users />} />
        <Route path='' element={<Navigate to='users' replace />} />
        <Route path='tables' element={<Tables />}>
          <Route path='*' element={<></>} />
        </Route>
        <Route path='*' element={<Navigate to='users' replace />} />
      </Routes>
    </>
  )
};

export default AppRoute;

