import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/LoginComponent'
import Dashboard from './pages/dashboard/Dashboard'
import LandingPage from './pages/landingPage/LandingPage';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} /> 
            <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
