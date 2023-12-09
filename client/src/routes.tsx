import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/nav-bar";
import { Users } from "./pages/users";
import { Tables } from "./pages/tables";

const AppRoute: React.FC = () => {

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

