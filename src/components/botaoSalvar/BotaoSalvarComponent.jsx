import styles from '../botaoSalvar/botaoSalvar.module.css';
import { RiSave2Line } from "react-icons/ri";

function BotaoSalvar(props) {
    return (
        <button className={styles.botao_salvar}
            onClick={props.onClick}
            width={props.width}
            backgroundColor={props.backgroundColor}>
            <RiSave2Line className='w-[10%] h-[100%]'/> {props.texto}
        </button>

    );
}

export default BotaoSalvar;