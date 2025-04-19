import styles from '../botaoSalvar/botaoSalvar.module.css';
import { RiSave2Line } from "react-icons/ri";
import { FaSave, FaSearch } from 'react-icons/fa';

function BotaoSalvar(props) {
    return (
        <button className={styles.botao_salvar}
            onClick={props.onClick}
            width={props.width}
            backgroundColor={props.backgroundColor}>
            <FaSave /> {props.texto}
        </button>

    );
}

export default BotaoSalvar;