import styles from './main.module.css';
import { IoIosArrowBack } from "react-icons/io";
import Titulo from '../titulo/TituloComponent';
import BotaoSalvar from '../botaoSalvar/BotaoSalvarComponent';

function MainComponent({ children, showBackItem }) {
    return (
        <section className={styles.main_component}>
            {showBackItem && (
                <button className={styles.seta_voltar}>
                    <IoIosArrowBack>
                    </IoIosArrowBack>
                    Voltar
                </button>
            )}
            <div className={styles.inputs_content}>
                <Titulo subtitulo="Conte sobre você" />
                <div className={styles.inputs_box}>
                    {children}
                </div>
            </div>
            <div className={styles.div_botao}>
                <BotaoSalvar
                    texto="Salvar e Continuar"
                    onClick={() => console.log("Botão clicado")}
                />
            </div>
        </section>
    );
};

export default MainComponent;