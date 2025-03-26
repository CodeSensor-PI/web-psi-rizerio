import BotaoIcone from '../botoesIcone/botoesIconeComponent'
import styles from '../cards/card.module.css'
import { FaArrowRight } from 'react-icons/fa'

function Card(props) {
    return (
        <article className={styles.card}>
            <img src="https://placehold.co/500x250" alt="Imagem de descrição do card" />
            <div className={styles.descricao_Card}>
                <h3 className='font-semibold'>{props.titulo}</h3>
                <span className='font-semibold'>{props.descricao}</span>
            </div>
            <div className={styles.botao}>
                <BotaoIcone
                    texto="Saiba Mais"
                    hoverTextColor="var(--LightPurplePsi)"
                    Icon={FaArrowRight}
                />
            </div>
        </article>
    )
}

export default Card