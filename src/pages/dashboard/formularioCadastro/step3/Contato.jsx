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

    function salvarInformacoes() {

        const contatoEmergenciaNumeros = contatoEmergencia.replace(/\D/g, '');

        if (!nomeEmergencia || contatoEmergenciaNumeros.length !== 11) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }
        navigate('/forms/conclusao')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.contato}>
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
                        />
                        <Input
                            name="contatoEmergencia"
                            value={contatoEmergencia}
                            width="w-[40%]"
                            label="Contato de emergência"
                            type="tel"
                            onChange={handleTelefoneChange}
                            placeholder="(00)00000-0000"
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            onClick={salvarInformacoes}
                        />
                    </div>
                </MainComponent>

            </section>
        </>
    );
};

export default Contato;