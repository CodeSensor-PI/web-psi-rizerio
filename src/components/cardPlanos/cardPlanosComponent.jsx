import styles from './cardPlanos.module.css'
import Botao from '../botoes/BotaoComponent'
import Titulo from '../titulo/TituloComponent'

function CardPlanos(props) {

    const handleLoginRedirect = () => {
        window.location.href = '/login'
    }

    return (
        <article className={styles.planos}>
            <Titulo
                subtitulo={props.titulo}
            />
            <span className='text-center'>{props.descricao}</span>

            <h1 className='text-[3em] font-bold'>{props.preco}</h1>
            <div onClick={handleLoginRedirect}>
                <Botao
                    texto="Ingressar"
                />
            </div>
        </article>
    )
}
export default CardPlanos