import styles from './metodos.module.css'
import Titulo from '../../../components/titulo/TituloComponent'
import Botao from '../../../components/botoes/BotaoComponent'
import Card from '../../../components/cards/CardComponent'
import ImagemDescritiva from '../../../assets/images/imagem-descritiva.jpg'
import ImagemExperimental from '../../../assets/images/imagem-experimental.jpg'
import ImagemCorrelacional from '../../../assets/images/imagem-correlacional.jpg'

const Metodos = () => {
    return (
        <section className={styles.metodos} id='metodologias'>

            <Titulo
                titulo="METODOLOGIAS"
                subtitulo="Maneiras que utilizaremos nas sessões"
            />

            <div className={styles.cards}>
                <Card
                    imagem={ImagemDescritiva}
                    titulo="Pesquisa Descritiva"
                    descricao="Busca descrever e analisar fenômenos psicológicos, muitas vezes utilizando métodos como entrevistas e observações. "
                />
                <Card
                    imagem={ImagemExperimental}
                    titulo="Pesquisa Experimental"
                    descricao="Envolve a manipulação de variáveis para observar seus efeitos, permitindo estabelecer relações causais."
                />
                <Card
                    imagem={ImagemCorrelacional}
                    titulo="Pesquisa Correlacional"
                    descricao="Examina a relação entre duas ou mais variáveis, identificando padrões, sem estabelecer relações causais."
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