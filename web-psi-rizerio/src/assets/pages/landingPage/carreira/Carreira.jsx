import InfoBox from '../../../components/infoBox/InfoBoxComponent'
import Titulo from '../../../components/titulo/TituloComponent'
import styles from '../carreira/carreira.module.css'
import icone1 from '../../../../assets/react.svg'

const Carreira = () => {
    return (
        <section className={styles.section}>
            <Titulo
                titulo="SOBRE A PSIRIZERIO"
                subtitulo="Carreira"
            />
            <div className={styles.cards}>
                <InfoBox
                    icone={icone1}
                    descricao="Id eros pellentesque facilisi id mollis faucibus commodo enim."
                />
                <InfoBox
                    icone={icone1}
                    descricao="Id eros pellentesque facilisi id mollis faucibus commodo enim."
                />
                <InfoBox
                    icone={icone1}
                    descricao="Id eros pellentesque facilisi id mollis faucibus commodo enim."
                />
                <InfoBox
                    icone={icone1}
                    descricao="Id eros pellentesque facilisi id mollis faucibus commodo enim."
                />
            </div>
        </section>
    )
}

export default Carreira