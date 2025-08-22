import Botao from "../../../components/botoes/BotaoComponent";
import styles from "./notFund.module.css";

const NotFound = () => {

    return (
        <>
            <div className={styles.container_notFound}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.message}>Página não encontrada</p>
                <Botao
                    texto="Voltar"
                    onClick={() => window.history.back()} />
            </div>
        </>
    );
};

export default NotFound;