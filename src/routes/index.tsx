// ** React router
import {BrowserRouter as Router, Routes, Route} from "react-router";

// ** Pages
import Login from "@/pages/login";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;