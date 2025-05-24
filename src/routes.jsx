import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginComponent from "./pages/login/LoginComponent";
import AlterarSenha from "./pages/dashboard/alterarSenha/alterarSenha";
import MeusAgendamentos from "./pages/dashboard/meusAgendamentos/MeusAgendamentos";
import DadosPessoais from "./pages/dashboard/formularioCadastro/step1/DadosPessoais";
import Localidade from "./pages/dashboard/formularioCadastro/step2/Localidade";
import Contato from "./pages/dashboard/formularioCadastro/step3/Contato";
import Conclusao from "./pages/dashboard/formularioCadastro/step4/Conclusao";
import MeusDados from "./pages/dashboard/meusDados/MeusDados";

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
]);