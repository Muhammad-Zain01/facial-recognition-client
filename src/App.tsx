import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
const Home = React.lazy(() => import('./pages/home/home'));
const Register = React.lazy(() => import('./pages/register/register'));
const Check = React.lazy(() => import('./pages/check/check'));
import Spinner from "./components/spinner/spinner";
function App(): JSX.Element {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/check' element={<Check />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
