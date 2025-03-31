import styles from '../botoes/botao.module.css'

function Botao({ texto, onClick, disabled, style, width, height, backgroundColor, color, hoverTextColor, hoverBackgroundColor }) {
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
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverBackgroundColor;
                    e.target.style.color = hoverTextColor;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = backgroundColor;
                    e.target.style.color = color
                }}>
                {texto}
            </button>
        </div>
    );
}

export default Botao