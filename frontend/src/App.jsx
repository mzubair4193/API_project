import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from "./componenets/LoginFormPage/LoginFormPage"
// import SignupFormPage from "./components/SignUpFormPage/SignUpFormPage";
import * as sessionActions from './store/session';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import SpotInfo from "./components/SpotInfo/SpotInfo";
import CreateASpot from "./components/CreateASpot/CreateASpot";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";
import ManageUserSpots from "./components/ManageSpots/ManageSpots";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotInfo />
      },
      {
        path: '/spots/new',
        element: <CreateASpot />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      },
      {
        path: '/spots/current',
        element: <ManageUserSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
