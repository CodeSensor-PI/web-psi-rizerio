import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginComponent from "./pages/login/LoginComponent";
import AlterarSenha from "./pages/dashboard/alterarSenha/alterarSenha";
import MeusAgendamentos from "./pages/dashboard/meusAgendamentos/meusAgendamentos";
import DadosPessoais from "./pages/dashboard/formularioCadastro/step1/DadosPessoais";
import Localidade from "./pages/dashboard/formularioCadastro/step2/Localidade";
import Contato from "./pages/dashboard/formularioCadastro/step3/Contato";
import Conclusao from "./pages/dashboard/formularioCadastro/step4/Conclusao";
import MeusDados from "./pages/dashboard/meusDados/MeusDados";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/errors/notFound/NotFound";
import Desconectado from "./pages/dashboard/desconectado/Desconectado";
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import ConfirmarCodigo from "./pages/esqueceuSenha/confirmarCodigo/ConfirmarCodigo";
import AlterarSenhaRecuperacao from "./pages/esqueceuSenha/alterarSenha/AlterarSenha";

export const routes = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginComponent /> },
  { path: "/esqueceu-senha", element: <EsqueceuSenha /> },
  { path: "/esqueceu-senha/confirmar-codigo", element: <ConfirmarCodigo /> },
  { path: "/esqueceu-senha/alterar-senha", element: <AlterarSenhaRecuperacao /> },
  {
    path: "/dashboard/alterar-senha",
    element: (
      <ProtectedRoute>
        <AlterarSenha />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/meus-agendamentos",
    element: (
      <ProtectedRoute>
        <MeusAgendamentos />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/meus-dados",
    element: (
      <ProtectedRoute>
        <MeusDados />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/forms",
    element: (
      <ProtectedRoute>
        <DadosPessoais />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/forms/localidade",
    element: (
      <ProtectedRoute>
        <Localidade />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/forms/contato",
    element: (
      <ProtectedRoute>
        <Contato />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/forms/conclusao",
    element: (
      <ProtectedRoute>
        <Conclusao />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);
