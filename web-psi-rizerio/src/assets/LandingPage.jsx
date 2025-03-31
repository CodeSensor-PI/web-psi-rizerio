import Abordagem from "./pages/landingPage/abordagem/Abordagem"
import Banner from "./pages/landingPage/banner/Banner"
import Carreira from "./pages/landingPage/carreira/Carreira"
import Header from "./pages/landingPage/header/Header"
import Metodos from "./pages/landingPage/metodos/Metodos"
import Planos from "./pages/landingPage/planos/Planos"

const LandingPage = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Carreira/>
            <Metodos/>
            <Abordagem/>
            <Planos/>
        </div>
    )
}

export default LandingPage