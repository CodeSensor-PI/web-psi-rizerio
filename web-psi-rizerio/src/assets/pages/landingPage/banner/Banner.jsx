import Botao from '../../../components/botoes/Botao'
import styles from '../banner/banner.module.css'
import Foto from '../../../images/foto-psi-rizerio.png'

const Banner = () => {
    return (
        <section className={styles.container} id='container'>
            <div className='image w-[40%]' id='image'>
                <img src={Foto} alt="Foto PsiRizerio" className="w-full" id='foto-psi-rizerio' />
            </div>
            <div className={styles.descricao}>
                <div className={styles.textos}>
                    <div className={styles.titulo}>
                        <h2 id='titulo' style={{color: "var(--PurplePsi)"}}>MEU NOME É</h2>
                        <h2 id='nome'>Jessica Rizerio</h2>
                        <h2 id='profissao'>Psicóloga</h2>
                    </div>
                    <div className={styles.bio}>
                        <span>Me chamo Jéssica, pode me chamar de
                            Jé, Jessi ou Jess.
                            Sou graduada pela
                            Universidade Cruzeiro do Sul e atuo
                            como Psicóloga Clínica.</span>
                            <br />
                            <span>No momento realizo atendimentos online
                            com base na Abordagem Centrada na
                            Pessoa.</span>
                            <br />
                            <span>Estou aqui para te ajudar nessa
                            constante evolução e transformação do
                            qual a Psicoterapia proporciona.</span>
                    </div>
                </div>
                <Botao
                    texto="Entre em contato"
                    width="200px" />
            </div>
        </section>
    )
}

export default Banner