import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import Input from '../../../../components/inputs/InputComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from '../step3/contato.module.css';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { Link } from 'react-router-dom'

const Contato = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.contato}>
                <StepComponent stepAtual={3} />
                <MainComponent stepAtual={3} showBackItem={true}>
                    <div className={styles.inputs_content_contato}>
                        <Input
                            width="w-[40%]"
                            label="Nome do contato de emergência"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Digite o nome"
                        />
                        <Input
                            width="w-[40%]"
                            label="Contato de emergência"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="(00)00000-0000"
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <Link to="/forms/conclusao">
                            <BotaoSalvar
                                texto="Salvar e Continuar"
                                onClick={() => console.log("Botão clicado")}
                            />
                        </Link>
                    </div>
                </MainComponent>

            </section>
        </>
    );
};

export default Contato;