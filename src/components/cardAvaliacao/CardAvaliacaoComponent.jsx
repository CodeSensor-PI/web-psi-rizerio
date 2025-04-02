import styles from './cardAvaliacao.module.css'

function CardAvaliacao(props) {
    return (
        <article className={styles.card_avaliacoes}>
            <img src={props.foto} alt="Foto do paciente" />
            <span className='text-center w-[70%]'>{props.avaliacao}</span>
            <div className={styles.info_usuario}>
                <h3 className="text-xl font-bold">{props.nome}</h3>
                <span className="text-lg">{props.profissao}</span>
            </div>
        </article>
    )
}

export default CardAvaliacao