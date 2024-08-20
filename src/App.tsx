import React from 'react'
import { Landing,Register,Error,Dashboard } from './Pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={3000} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </BrowserRouter>
  )
}

export default App
