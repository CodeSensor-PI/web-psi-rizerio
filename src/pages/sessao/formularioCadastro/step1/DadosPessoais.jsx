import HeaderDash from '../../../../components/headerDash/HeaderDashComponent'
import StepComponent from '../../../../components/steps/StepComponent'
import MainComponent from '../../../../components/main/MainComponent'
import styles from '../step1/dadosPessoais.module.css'
import Input from '../../../../components/inputs/InputComponent'

const DadosPessoais = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.dados_pessoais}>
                <StepComponent stepAtual={1} />
                <MainComponent showBackItem={false} caminhoTela={"/forms/localidade"}>
                    <div className={styles.inputs_content_dados}>
                        <Input className="flex-col"
                            label="Quando você nasceu"
                            type="date"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="DD/MM/AAAA"
                        />
                        <Input className="flex-col"
                            label="Qual o seu telefone"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="(00)00000-0000"
                        />
                        <Input className="flex-col"
                            label="Qual o seu CPF"
                            type="number"
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="000.000.000-00"
                        />
                    </div>
                </MainComponent>
            </section>
        </>
    )
}

export default DadosPessoais