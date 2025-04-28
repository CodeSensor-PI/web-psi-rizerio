import AlterarSenha from "./alterarSenha/alterarSenha"
import DadosPessoais from "./formularioCadastro/step1/DadosPessoais"
import Localidade from "./formularioCadastro/step2/Localidade"
import Contato from "./formularioCadastro/step3/Contato"
import Conclusao from "./formularioCadastro/step4/Conclusao"
import MeusAgendamentos from "./meusAgendamentos/MeusAgendamentos"
import { Route, Routes } from "react-router-dom"

const Dashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="alterar-senha" element={<AlterarSenha />} />
                <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
                <Route path="forms">
                    <Route index element={<DadosPessoais />} />
                    <Route path="localidade" element={<Localidade />} />
                    <Route path="contato" element={<Contato />} />
                    <Route path="conclusao" element={<Conclusao />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Dashboard