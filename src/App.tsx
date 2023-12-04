import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/home"
import Register from "./pages/register/register"
function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
