import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/LoginComponent'
import AlterarSenha from './pages/dashboard/alterarSenha/alterarSenha';
import LandingPage from './pages/landingPage/LandingPage'
import Localidade from './pages/sessao/';
import Contato from './pages/sessao/dashboard/formularioCadastro/step3/Contato';
import Conclusao from './pages/sessao/dashboard/formularioCadastro/step4/Conclusao';
import MeusAgendamentos from './pages/dashboard/meusAgendamentos/meusAgendamentos';



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
            <Route path='/dashboard/meusAgendamentos' element={<MeusAgendamentos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
