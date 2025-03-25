import Banner from "./pages/landingPage/banner/Banner"
import Carreira from "./pages/landingPage/carreira/Carreira"
import Header from "./pages/landingPage/header/Header"
import Metodos from "./pages/landingPage/metodos/Metodos"

const LandingPage = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Carreira/>
            <Metodos/>
        </div>
    )
}

export default LandingPage