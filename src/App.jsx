import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DadosPessoais from './pages/sessao/formularioCadastro/step1/DadosPessoais';
import Login from './pages/login/LoginComponent'
import AlterarSenha from './pages/dashboard/alterarSenha/alterarSenha';
import LandingPage from './pages/landingPage/LandingPage'
import Localidade from './pages/sessao/formularioCadastro/step2/Localidade';
import Contato from './pages/sessao/formularioCadastro/step3/Contato';
import Conclusao from './pages/sessao/formularioCadastro/step4/Conclusao';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} /> 
            <Route path='/forms' element={<DadosPessoais/>} />
            <Route path='/forms/localidade' element={<Localidade/>} />
            <Route path='/forms/contato' element={<Contato/>} />
            <Route path='/forms/conclusao' element={<Conclusao/>} />
            <Route path='/dashboard/alterarSenha' element={<AlterarSenha/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
