import React from "react";
import { Landing, Register, Error, ProtectedRoutes } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AllJobs,
  AddJobs,
  Profile,
  SharedLayout,
  Stats,
} from "./Pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Stats />} />
        <Route path='all-jobs' element={<AllJobs />} />
        <Route path='add-job' element={<AddJobs />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='landing' element={<Landing />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
    <ToastContainer
  position="top-center"
  autoClose={3000}
  closeOnClick
  pauseOnHover
  draggable
  pauseOnFocusLoss
/>
  </BrowserRouter>
  );
};

export default App;

