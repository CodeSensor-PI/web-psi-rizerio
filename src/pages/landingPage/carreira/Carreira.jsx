import InfoBox from '../../../components/infoBox/InfoBoxComponent'
import Titulo from '../../../components/titulo/TituloComponent'
import styles from './carreira.module.css'
import { FaBrain, FaUserTie, FaBriefcase, FaGraduationCap } from 'react-icons/fa'

const Carreira = () => {
    return (
        <section className={styles.section} id='sobre'>
            <Titulo
                titulo="SOBRE A PSIRIZERIO"
                subtitulo="Carreira"
            />
            <div className={styles.cards}>
                <InfoBox
                    icone={FaGraduationCap}
                    descricao="Fiz meu ensino médio na ETEC e uma faculdade de Psicologia."
                />
                <InfoBox
                    icone={FaUserTie}
                    descricao="Durante a faculdade, trabalhei com Recursos Humanos."
                />
                <InfoBox
                    icone={FaBriefcase}
                    descricao="Mudei de área onde fiz um estágio em Psicologia."
                />
                <InfoBox
                    icone={FaBrain}
                    descricao="Atualmente atendo meus pacientes particulares em consultas online."
                />
            </div>
        </section>
    )
}

export default Carreira