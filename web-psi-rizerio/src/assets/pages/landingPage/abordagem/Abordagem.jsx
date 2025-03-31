import styles from '../abordagem/abordagem.module.css'
import Botao from '../../../components/botoes/BotaoComponent'
import BotaoIcone from '../../../components/botoesIcone/BotoesIconeComponent'
import Titulo from '../../../components/titulo/TituloComponent'
import { FaArrowRight } from 'react-icons/fa'

const Abordagem = () => {
    return (
        <>
            <section className={styles.abordagem}>
                <img src="https://placehold.co/500x500" className='h-[80%]' alt="Foto sobre abordagem ACP" />
                <div className={styles.container_abordagem}>
                    <Titulo
                        titulo='ACP'
                        subtitulo='Abordagem ACP'
                    />
                    <div className={styles.textos_abordagem}>
                        <span>Atualmente utilizo a ACP (Abordagem Centrada na Pessoa), que valoriza a aceitação, acolhimento e a autenticidade.</span>
                        <br /><br />
                        <span>Aqui, os atendimentos são guiados por você, eu te acompanho, ajudo a refletir e juntas vamos encontrar caminhos que façam sentido.</span>
                    </div>
                    <div className={styles.botoes_abordagem}>
                        <Botao
                            texto="Saiba Mais"
                            width='150px'
                            height='40px'
                        />
                        <BotaoIcone
                            texto='Fazer Login'
                            width='150px'
                            height='40px'
                            color='var(--PurplePsi)'
                            backgroundColor='transparent'
                            border='var(--PurplePsi)'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Abordagem