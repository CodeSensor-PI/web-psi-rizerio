import styles from '../step2/localidade.module.css';
import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import Input from '../../../../components/inputs/InputComponent';
import StepComponent from '../../../../components/steps/StepComponent';

const Localidade = () => {
    return (
        <>  
            <HeaderDash showSettingsIcon={false} />
            <StepComponent stepAtual={2} />
            <section className={styles.localidade}>
                <MainComponent caminhoTela={"/forms/contato"}>
                    <div className={styles.inputs_content_localidade}>
                        <Input
                            label="CEP"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="00000-000"
                        />
                        <Input
                            label="Logradouro"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Rua, Avenida, Estrada"
                        />
                        <Input
                            label="Bairro"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira seu bairro"
                        />
                        <Input
                            label="Cidade"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira sua cidade"
                        />
                        <Input
                            label="Estado"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira seu estado"
                        />
                        <Input
                            label="Número"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira o número da residência"
                        />
                        <Input
                            label="Complemento"
                            type="text"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Insira o complemento da residência"
                        />
                    </div>
                </MainComponent>

            </section>
        </>
    );
};

export default Localidade;