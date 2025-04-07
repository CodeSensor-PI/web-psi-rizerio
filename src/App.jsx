import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DadosPessoais from './pages/sessao/formularioCadastro/step1/DadosPessoais';
import Login from './pages/login/LoginComponent'
import LandingPage from './pages/landingPage/LandingPage'

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            { <Route path='/' element={<LandingPage/>} />}
            { <Route path='/login' element={<Login/>} /> }
            <Route path='/forms' element={<DadosPessoais/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
