import styles from './botao.module.css'

function Botao({ texto, onClick, disabled, style, height, width, backgroundColor, color, hoverTextColor, hoverBackgroundColor, icone }) {
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
            {icone && <span className={styles.icon} aria-hidden="true">{icone}</span>}
            <span className={styles.label}>{texto}</span>
        </button>
    );
}

export default Botao