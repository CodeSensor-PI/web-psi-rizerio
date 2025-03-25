import Botao from '../botoes/BotaoComponent'
import styles from '../cards/card.module.css'

function Card() {
    return (
        <article className={styles.card}>
            <img src="https://placehold.co/500x250" alt="Imagem de descrição do card" />
            <div className={styles.descricao_Card}>
                <h3 className='font-semibold'>Title</h3>
                <span className='font-semibold'>Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.</span>
            </div>
            <div className={styles.botao}>
                <Botao
                    texto="Saiba Mais" 
                    backgroundcolor="none"
                />
            </div>
        </article>
    )
}

export default Card