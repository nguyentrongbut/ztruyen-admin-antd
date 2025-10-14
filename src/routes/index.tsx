// ** React router
import {BrowserRouter as Router, Routes, Route} from "react-router";

// ** Routes
import {ProtectedRoute} from "@/routes/protected.route.tsx";

// ** Layouts
import DefaultLayout from "@/layouts/default-layout";

// ** Pages
import Login from "@/pages/login";
import Home from "@/pages/home";
import ForbiddenPage from "@/pages/403";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    element={
                        <ProtectedRoute>
                            <DefaultLayout/>
                        </ProtectedRoute>
                    }
                >
                    <Route index path="/" element={<Home/>}/>
                </Route>

                <Route path='/login' element={<Login/>}/>
                <Route path='/403' element={<ForbiddenPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;