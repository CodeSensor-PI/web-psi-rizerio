import styles from "./Desconectado.module.css";
import Botao from "../../../components/botoes/BotaoComponent";
const Desconectado = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Você foi desconectado</h1>
                <div className={styles.botoesContainer}>
                    <Botao
                    texto="Home"
                    onClick={() => window.location.href = "/"} />

                    <Botao
                    texto="Login"
                    onClick={() => window.location.href = "/login"} />

                </div>
                
            </div>
        </>
    );
}

export default Desconectado;