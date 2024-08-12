import React from 'react'
import { Landing,Register,Error,Dashboard } from './Pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
