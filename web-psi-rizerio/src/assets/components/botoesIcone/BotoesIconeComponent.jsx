import styles from '../botoesIcone/botoesIcone.module.css'

function BotaoIcone({ texto, Icon, onClick, disabled, style, width, height, backgroundColor, hoverTextColor, hover, hoverBackgroundColor}) {
    return (
        <div className={styles.botoes}>
            <button
                className={styles.botaoIcone}
                onClick={onClick}
                disabled={disabled}
                style={{
                    ...style,
                    width,
                    height,
                    backgroundColor,
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverBackgroundColor;
                    e.target.style.color = hoverTextColor;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = backgroundColor;
                    e.target.style.color = "var(--PurplePsi)"
                }}>
                {texto}
                    {Icon && <Icon className='w-[12%] h-[12%]' />}
            </button>
        </div>
    );
}

export default BotaoIcone