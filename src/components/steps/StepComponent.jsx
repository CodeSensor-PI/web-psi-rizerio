import styles from './step.module.css';

const steps = ['Dados Pessoais', 'Localidade', 'Contato', 'Conclusão'];

const StepComponent = ({ stepAtual }) => {
    return (
        <div className={styles.step_container}>
            <div className={styles.step_header}>
                <h2 className={styles.title}>Etapa de <b>{steps[stepAtual - 1]}</b></h2>
            </div>
            <div className={styles.step_component}>

                {steps.map((label, index) => {
                    const numeroEtapa = index + 1;
                    const ativo = stepAtual === numeroEtapa;
                    const completo = stepAtual > numeroEtapa;

                    return (
                        <div className={styles.step_wrapper} key={index}>

                            {index !== 0 && (
                                <div
                                    className={`${styles.line} ${stepAtual >= numeroEtapa ? styles.line_completed : ''
                                        }`}
                                />
                            )}
                            <div
                                className={`${styles.circle} ${completo ? styles.completed : ''
                                    } ${ativo ? styles.active : ''}`}
                            >
                                {numeroEtapa}
                            </div>
                            <span className={styles.label}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepComponent;
