import styles from '../cardPlanos/cardPlanos.module.css'
import Botao from '../botoes/BotaoComponent'
import Titulo from '../titulo/TituloComponent'

function CardPlanos(props) {
    return (
        <article className={styles.planos}>
            <Titulo
                subtitulo={props.titulo}
            />
            <span className='text-center'>{props.descricao}</span>

            <h1 className='text-[3em] font-bold'>{props.preco}</h1>
            <Botao
                texto="Ingressar"
            />
        </article>
    )
}
export default CardPlanos