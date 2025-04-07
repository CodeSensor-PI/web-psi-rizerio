import styles from './main.module.css';
import { IoIosArrowBack } from "react-icons/io";
import Titulo from '../titulo/TituloComponent';

const MainComponent = () => {
    return (
        <section className={styles.main_component}>
            <button className={styles.seta_voltar}>
                <IoIosArrowBack/> Voltar
            </button>
            <Titulo titulo="Conte sobre você"/>
            
        </section>
    );
};

export default MainComponent;