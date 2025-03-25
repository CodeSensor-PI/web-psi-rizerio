import styles from '../botoes/botao.module.css'

function Botao({ texto, onClick, disabled, style, width, height, color }) {
    return (
        <div className={styles.botoes}>
            <button
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
                style={{
                    ...style,
                    width: width,
                    height: height,
                    backgroundColor: color,
                }}>
                {texto}
            </button>
        </div>
    );
}

export default Botao