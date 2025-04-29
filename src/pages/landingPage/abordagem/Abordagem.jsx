import styles from './abordagem.module.css'
import Botao from '../../../components/botoes/BotaoComponent'
import Titulo from '../../../components/titulo/TituloComponent'
import ImagemACP from '../../../assets/images/imagem-acp.jpg'
import { FaArrowRight } from 'react-icons/fa'

const Abordagem = () => {

    const handleLoginRedirect = () => {
        window.location.href = '/login'
    }
    
    return (    
        <>
            <section className={styles.abordagem}>
                <img src={ImagemACP} className='w-[50%] h-[80%]' alt="Foto sobre abordagem ACP" />
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
                        <button className={styles.botao_abordagem} onClick={handleLoginRedirect} >
                            Fazer Login <FaArrowRight className='w-[30%] h-[50%]' />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Abordagem