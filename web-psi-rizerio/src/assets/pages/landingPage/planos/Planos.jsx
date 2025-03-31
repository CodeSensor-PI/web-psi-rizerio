import styles from '../planos/planos.module.css'
import Titulo from "../../../components/titulo/TituloComponent"
import CardPlanos from '../../../components/cardPlanos/cardPlanosComponent'

const Planos = () => {
    return (
        <>
            <section className={styles.section_planos} id='planos'>
                <div className={styles.titulo_planos}>
                    <Titulo
                        titulo="PLANOS"
                        subtitulo="Planos de consulta"
                    />
                    <span className='text-center'>Oferecemos diferentes planos de consultas para atender às suas necessidades. Cada plano é pensado para proporcionar o melhor cuidado e acompanhamento, com preços acessíveis e condições que cabem no seu bolso. Consulte abaixo os valores e escolha o plano que melhor se adapta a você.</span>
                </div>

                <div className={styles.container_planos}>
                    <CardPlanos
                        titulo="Avulso"
                        descricao='Plano avulso para você que quer fazer a primeira sessão ou uma sessão de terapia individual um "test-drive"!'
                        preco="R$ 80"
                    />
                    <CardPlanos
                        titulo="Mensal"
                        descricao="Plano mensal para você que quer ter uma rotina de terapia, onde nos encontramos em todos os meses para melhor atender você!"
                        preco="R$ 100"
                    />
                </div>
            </section>
        </>
    )
}

export default Planos