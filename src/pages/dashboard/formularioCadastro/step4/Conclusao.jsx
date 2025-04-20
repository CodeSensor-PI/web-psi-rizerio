import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from './conclusao.module.css';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { errorMessage } from "../../../../utils/alert";

const Conclusao = () => {

    const [motivoConsulta, setMotivoConsulta] = useState('');

    function salvarInformacoes() {

        if (motivoConsulta.length <= 5) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }

    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.conclusao}>
                <StepComponent stepAtual={4} />
                <MainComponent stepAtual={4} showBackItem={true}>
                    <div className={styles.inputs_content_conclusao}>
                        <label className='font-bold' htmlFor="motivo_consulta">Explique o motivo da sua consulta</label>
                        <textarea
                            name="motivo_consulta"
                            value={motivoConsulta}
                            onChange={(e) => setMotivoConsulta(e.target.value)}
                        >

                        </textarea>
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

export default Conclusao;