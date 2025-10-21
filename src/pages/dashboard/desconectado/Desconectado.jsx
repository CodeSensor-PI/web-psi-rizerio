import styles from "./Desconectado.module.css";
import Botao from "../../../components/botoes/BotaoComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";  

const Desconectado = () => {
    const navigate = useNavigate();
    

    return (
        <>
            <main className={styles.container} aria-labelledby="desc-title">
                <h1 id="desc-title" className={styles.title} role="alert" aria-live="polite">
                    Você foi desconectado
                </h1>

                <div className={styles.botoesContainer} role="group" aria-label="Ações após desconexão">
                    <Botao
                        texto="Home"
                        onClick={() => navigate("/")}
                        ariaLabel="Ir para a página inicial" 
                        icone={<IoIosHome />}
                        
                    /> 

                    <Botao
                        texto="Login"
                        onClick={() => navigate("/login")}
                        ariaLabel="Ir para a tela de login"
                        icone={<FaUserCircle />}
                    />
                </div>

            </main>
        </>
    );
}

export default Desconectado;