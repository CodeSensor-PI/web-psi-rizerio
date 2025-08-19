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

export const routes = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginComponent /> },
    { path: "/dashboard/alterar-senha", element: <AlterarSenha /> },
    { path: "/dashboard/meus-agendamentos", element: <MeusAgendamentos /> },
    { path: "/dashboard/meus-dados", element: <MeusDados /> },
    { path: "/dashboard/forms", element: <DadosPessoais /> },
    { path: "/dashboard/forms/localidade", element: <Localidade /> },
    { path: "/dashboard/forms/contato", element: <Contato /> },
    { path: "/dashboard/forms/conclusao", element: <Conclusao /> },
    // Rotas protegidas por ambiente
    { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: "/dashboard/agendamentos", element: <ProtectedRoute><MeusAgendamentos /></ProtectedRoute> },
    { path: "/dashboard/agendamentos/cadastrar/:id", element: <ProtectedRoute><CadastrarAgendamento /></ProtectedRoute> },
    { path: "/dashboard/agendamentos/cadastrar", element: <ProtectedRoute><CadastrarAgendamento /></ProtectedRoute> },
    { path: "/dashboard/agendamentos/editar/:id", element: <ProtectedRoute><EditarAgendamento /></ProtectedRoute> },
    { path: "/dashboard/pacientes", element: <ProtectedRoute><Pacientes /></ProtectedRoute> },
    { path: "/dashboard/pacientes/editar/:id", element: <ProtectedRoute><EditarPaciente /></ProtectedRoute> },
    { path: "/dashboard/pacientes/adicionar", element: <ProtectedRoute><AdicionarPaciente /></ProtectedRoute> },
    { path: "/dashboard/administracao", element: <ProtectedRoute><Administracao /></ProtectedRoute> },
    { path: "/dashboard/psicologos", element: <ProtectedRoute><Psicologos /></ProtectedRoute> },
    { path: "/dashboard/psicologos/adicionar", element: <ProtectedRoute><AdicionarPsicologo /></ProtectedRoute> },
    { path: "/dashboard/psicologos/editar/:id", element: <ProtectedRoute><EditarPsicologo /></ProtectedRoute> },
    { path: "*", element: <h1>Página não encontrada.</h1> },
]);