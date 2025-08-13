import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import Input from '../../../../components/inputs/InputComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from './contato.module.css';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { errorMessage } from "../../../../utils/alert";

const Contato = () => {

    const [nomeEmergencia, setNomeEmergencia] = useState('')
    const [contatoEmergencia, setContatoEmergencia] = useState('')
    const navigate = useNavigate()

    const handleTelefoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setContatoEmergencia(formattedValue);
    };

    function salvarInformacoes(e) {
        e.preventDefault();

        const contatoEmergenciaNumeros = contatoEmergencia.replace(/\D/g, '');
        const dddEmergencia = contatoEmergenciaNumeros.slice(0, 2);
        const numeroEmergencia = contatoEmergenciaNumeros.slice(2);

        if (!nomeEmergencia || contatoEmergenciaNumeros.length !== 11) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }

        localStorage.setItem('contatoEmergencia', JSON.stringify({
            ddd: dddEmergencia,
            telefone: numeroEmergencia,
            nomeContato: nomeEmergencia,
            tipo: "EMERGENCIAL",
            fkPaciente: localStorage.getItem('idUsuario')
        }));

        navigate('/dashboard/forms/conclusao')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} telaAtual={'contato'} />
            <form onSubmit={salvarInformacoes} className={styles.contato}>
                <StepComponent stepAtual={3} />
                <MainComponent stepAtual={3} showBackItem={true}>
                    <div className={styles.inputs_content_contato}>
                        <Input
                            name="nomeEmergencia"
                            value={nomeEmergencia}
                            width="w-[40%]"
                            label="Nome do contato de emergência"
                            type="text"
                            onChange={(e) => setNomeEmergencia(e.target.value)}
                            placeholder="Digite o nome"
                            required={true}
                        />
                        <Input
                            name="contatoEmergencia"
                            value={contatoEmergencia}
                            width="w-[40%]"
                            label="Contato de emergência"
                            type="tel"
                            onChange={handleTelefoneChange}
                            placeholder="(00)00000-0000"
                            required={true}
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            type="submit"
                            onSubmit={salvarInformacoes}
                        />
                    </div>
                </MainComponent>

            </form>
        </>
    );
};

export default Contato;