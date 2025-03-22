import Botao from '../../../components/botoes/Botao';
import styles from '../header/header.module.css'
import Logo from '../../../images/SUBLOGO-04.png'

const Header = () => {
    return (
        <header className={styles.header} id="header">
            <img src={Logo} alt="Logo JR"  id='logo_header' />
            <navbar className={styles.navbar} id='navbar'>
                <ul>
                    <li><a className='navbar-item' href="#home">Home</a></li>
                    <li><a className='navbar-item' href="#sobre">Sobre a PsiRizerio</a></li>
                    <li><a className='navbar-item' href="#metodologias">Metodologias</a></li>
                    <li><a className='navbar-item' href="#planos">Planos</a></li>
                    <li><a className='navbar-item' href="#avaliacoes">Avaliações</a></li>
                    <li><a className='navbar-item' href="#faq">FAQ</a></li>
                </ul>
            </navbar>
            <div className={styles.botoes} id='botoes'>
                <Botao
                texto="Entrar"/>
            </div>
        </header>
    );
}

export default Header