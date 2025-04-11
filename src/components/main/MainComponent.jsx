import styles from './main.module.css';
import { IoIosArrowBack } from "react-icons/io";
import Titulo from '../titulo/TituloComponent';
import BotaoSalvar from '../botaoSalvar/BotaoSalvarComponent';
import { Link } from 'react-router-dom';

function MainComponent({ children, showBackItem, caminhoTela }) {
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
                <Link to={caminhoTela}>
                    <BotaoSalvar
                        texto="Salvar e Continuar"
                        onClick={() => console.log("Botão clicado")}
                    />
                </Link>
            </div>
        </section>
    );
};

export default MainComponent;