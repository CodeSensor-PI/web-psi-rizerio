import Abordagem from "./abordagem/Abordagem"
import Avaliacao from "./avaliacao/Avaliacao"
import Banner from "./banner/Banner"
import Carreira from "./carreira/Carreira"
import Faq from "./faq/Faq"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import Metodos from "./metodos/Metodos"
import Planos from "./planos/Planos"

const LandingPage = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Carreira/>
            <Metodos/>
            <Abordagem/>
            <Planos/>
            <Avaliacao/>
            <Faq/>
            <Footer/>
        </div>
    )
}

export default LandingPage