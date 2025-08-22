import { Route, Routes } from "react-router-dom";
import NotFound from "./notFound/NotFound";

const Errors = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={NotFound} />
            </Routes>
        </div>
    )
}

export default Errors;