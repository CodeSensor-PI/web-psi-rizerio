import styles from './main.module.css';
import { IoIosArrowBack } from "react-icons/io";
import Titulo from '../titulo/TituloComponent';
import { useNavigate } from 'react-router-dom';

const stepBackRoutes = {
    2: '/dashboard/forms',
    3: '/dashboard/forms/localidade',
    4: '/dashboard/forms/contato',
};

function MainComponent({ children, showBackItem, stepAtual, tituloPagina }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const previousPath = stepBackRoutes[stepAtual];
        if (stepAtual === 4) {
            localStorage.removeItem('motivoConsulta');
        } else if (stepAtual === 3) {
            localStorage.removeItem('contatoEmergencia');
        } else if (stepAtual === 2) {
            localStorage.removeItem('endereco');
        } else if (stepAtual === 1) {
            localStorage.removeItem('dadosPessoais');
        }
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
                <Titulo subtitulo={tituloPagina || "Conte sobre você"} />
                <div className={styles.inputs_box}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default MainComponent;
