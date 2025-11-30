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
                width: width,
                backgroundColor: backgroundColor,
                color: color,
            }}
            onMouseEnter={(e) => {
                if (hoverBackgroundColor) e.target.style.backgroundColor = hoverBackgroundColor;
                if (hoverTextColor) e.target.style.color = hoverTextColor;
            }}
            onMouseLeave={(e) => {
                if (backgroundColor) e.target.style.backgroundColor = backgroundColor;
                if (color) e.target.style.color = color;
            }}>
            {icone && <span className={styles.icon} aria-hidden="true">{icone}</span>}
            <span className={styles.label}>{texto}</span>
        </button>
    );
}

export default Botao