import styles from '../metodos/metodos.module.css'
import Titulo from '../../../components/titulo/TituloComponent'
import Botao from '../../../components/botoes/BotaoComponent'
import Card from '../../../components/cards/CardComponent'

const Metodos = () => {
    return (
        <section className={styles.metodos}>

            <Titulo
                titulo="METODOLOGIAS"
                subtitulo="Maneiras que utilizaremos nas sessões"
            />

            <div className={styles.cards}>
                <Card/>
                <Card/>
                <Card/>
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