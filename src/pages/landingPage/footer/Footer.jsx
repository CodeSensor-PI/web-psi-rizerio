import styles from './footer.module.css'
import Titulo from '../../../components/titulo/TituloComponent'
import { FaWhatsapp } from "react-icons/fa"

const Footer = () => {
    return (
        <section className={styles.section_footer}>
            <Titulo
                titulo="Entre em contato"
                subtitulo="Entre em contato via WhatsApp!"
            />
            <button className={styles.footer_botao}>
                <FaWhatsapp className='w-[10%] h-[50%]'/> Entre em contato
            </button>

            <footer className='bg-black w-[100%] h-[20%] flex justify-center items-center'>
                <span className='text-white'>AgendFy @ 2025. Todos direitos reservados.</span>
            </footer>
        </section>

    )
}

export default Footer