import styles from './card.module.css'
import { FaArrowRight } from 'react-icons/fa'

function Card(props) {
    return (
        <article className={styles.card}>
            <img src="https://placehold.co/500x250" alt="Imagem de descrição do card" />
            <div className={styles.descricao_Card}>
                <h3 className='font-semibold'>{props.titulo}</h3>
                <span className='font-semibold'>{props.descricao}</span>
            </div>
            <button className={styles.botao}>
                Saiba Mais <FaArrowRight className='w-[20%] h-[60%]'/>
            </button>
        </article>
    )
}

export default Card