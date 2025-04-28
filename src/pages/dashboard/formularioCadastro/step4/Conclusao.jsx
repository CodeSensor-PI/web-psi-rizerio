import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from './conclusao.module.css';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { errorMessage } from "../../../../utils/alert";
import { salvarDadosFormulario, obterDadosFormulario } from '../../../../utils/formStorage';

const Conclusao = () => {

    const [motivoConsulta, setMotivoConsulta] = useState('');

    function salvarInformacoes(e) {
        e.preventDefault();

        if (motivoConsulta.length <= 5) {
            errorMessage("Motivo da consulta deve ter mais de 5 caracteres.")
            return
        }

        salvarDadosFormulario('dados-pessoais', { motivoConsulta });

        const dadosCompletos = obterDadosFormulario();
        console.log("Enviando para Backend: ", dadosCompletos);
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <form onSubmit={salvarInformacoes} className={styles.conclusao}>
                <StepComponent stepAtual={4} />
                <MainComponent stepAtual={4} showBackItem={true}>
                    <div className={styles.inputs_content_conclusao}>
                        <label className='font-bold' htmlFor="motivo_consulta">Explique o motivo da sua consulta</label>
                        <textarea required={true}
                            name="motivo_consulta"
                            value={motivoConsulta}
                            onChange={(e) => setMotivoConsulta(e.target.value)}
                        >

                        </textarea>
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            type="submit"
                        />
                    </div>
                </MainComponent>

            </form>
        </>
    );
};

export default Conclusao;