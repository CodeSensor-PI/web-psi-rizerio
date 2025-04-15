import styles from './main.module.css';
import { IoIosArrowBack } from "react-icons/io";
import Titulo from '../titulo/TituloComponent';
import BotaoSalvar from '../botaoSalvar/BotaoSalvarComponent';
import { Link, useNavigate } from 'react-router-dom';

const stepBackRoutes = {
    2: '/forms',
    3: '/forms/localidade',
    4: '/forms/contato',
};

function MainComponent({ children, showBackItem, caminhoTela, stepAtual }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const previousPath = stepBackRoutes[stepAtual];
        navigate(previousPath);
    };

    return (
        <section className={styles.main_component}>
            {showBackItem && (
                <button className={styles.seta_voltar} onClick={handleBackClick}>
                    <IoIosArrowBack />
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
