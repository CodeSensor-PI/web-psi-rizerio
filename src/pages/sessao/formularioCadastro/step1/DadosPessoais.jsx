import HeaderDash from '../../../../components/headerDash/HeaderDashComponent'
import StepComponent from '../../../../components/steps/StepComponent'
import MainComponent from '../../../../components/main/MainComponent'
import styles from '../step1/dadosPessoais.module.css'

const DadosPessoais = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.dados_pessoais}>
                <StepComponent stepAtual={3} />
                <MainComponent />
            </section>
        </>
    )
}

export default DadosPessoais