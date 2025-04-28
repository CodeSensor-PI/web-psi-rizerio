import styles from '../botaoSalvar/botaoSalvar.module.css';
import { FaSave } from 'react-icons/fa';

function BotaoSalvar(props) {
    return (
        <button className={styles.botao_salvar}
            onClick={props.onClick}
            width={props.width}
            backgroundColor={props.backgroundColor}
            type={props.type}>
            <FaSave /> {props.texto}
        </button>

    );
}

export default BotaoSalvar;