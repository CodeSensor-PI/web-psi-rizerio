import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import styles from '../step4/conclusao.module.css';

const Conclusao = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.conclusao}>
                <StepComponent stepAtual={4} />
                <MainComponent stepAtual={4} caminhoTela={"/forms/conclusao"} showBackItem={true}>
                    <div className={styles.inputs_content_conclusao}>
                        <label className='font-bold' htmlFor="motivo_consulta">Explique o motivo da sua consulta</label>
                        <textarea name="motivo_consulta"></textarea>
                    </div>
                </MainComponent>

            </section>
        </>
    );
};

export default Conclusao;