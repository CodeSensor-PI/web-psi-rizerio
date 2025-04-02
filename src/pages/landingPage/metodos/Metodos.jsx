import styles from './metodos.module.css'
import Titulo from '../../../components/titulo/TituloComponent'
import Botao from '../../../components/botoes/BotaoComponent'
import Card from '../../../components/cards/CardComponent'

const Metodos = () => {
    return (
        <section className={styles.metodos} id='metodologias'>

            <Titulo
                titulo="METODOLOGIAS"
                subtitulo="Maneiras que utilizaremos nas sessões"
            />

            <div className={styles.cards}>
                <Card
                    titulo="Card 1"
                    descricao="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio dolor provident consectetur esse dolores facilis facere"
                />
                <Card
                    titulo="Card 2"
                    descricao="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio dolor provident consectetur esse dolores facilis facere"
                />
                <Card
                    titulo="Card 3"
                    descricao="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio dolor provident consectetur esse dolores facilis facere"
                />
            </div>

            <div className="w-[14%]">
                <Botao
                    texto="Entre em contato"
                    width="200px"
                />
            </div>

        </section>
    )
}

export default Metodos