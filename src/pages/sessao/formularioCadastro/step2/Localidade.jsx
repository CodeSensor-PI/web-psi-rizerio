import styles from '../step2/localidade.module.css';
import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import Input from '../../../../components/inputs/InputComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { Link } from 'react-router-dom'

const Localidade = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.localidade}>
                <StepComponent stepAtual={2} />
                <MainComponent stepAtual={2} caminhoTela={"/forms/contato"} showBackItem={true}>
                    <div className={styles.inputs_content_localidade}>
                        <Input
                            width="w-[15%]"
                            label="CEP"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="00000-000"
                        />
                        <Input
                            width="w-[35%]"
                            label="Logradouro"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Rua, Avenida, Estrada"
                        />
                        <Input
                            width="w-[20%]"
                            label="Bairro"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira seu bairro"
                        />
                        <Input
                            width="w-[23%]"
                            label="Cidade"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira sua cidade"
                        />
                        <Input
                            width="w-[20%]"
                            label="Estado"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira seu estado"
                        />
                        <Input
                            width="w-[25%]"
                            label="Número"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira o número"
                        />
                        <Input
                            width="w-[30%]"
                            label="Complemento"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira o complemento"
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <Link to="/forms/contato">
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

export default Localidade;