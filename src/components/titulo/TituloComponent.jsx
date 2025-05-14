import styles from './titulo.module.css'

function Titulo({ titulo, subtitulo }) {
    return (<div className={styles.component}>
        <div>
            <h2 className={styles.titulo}>{titulo}</h2>
        </div>
        <div>
            <h2 className={styles.subtitulo}>{subtitulo}</h2>
        </div>
    </div>
    )
}

export default Titulo;