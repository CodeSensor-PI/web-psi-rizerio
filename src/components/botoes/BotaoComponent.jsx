import styles from './botao.module.css'

function Botao({ texto, onClick, disabled, style, height, backgroundColor, color, hoverTextColor, hoverBackgroundColor }) {
    return (
        
            <button
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
                style={{
                    ...style,
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
        
    );
}

export default Botao