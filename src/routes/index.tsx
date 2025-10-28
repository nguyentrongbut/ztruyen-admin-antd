// ** React router
import {BrowserRouter as Router, Routes, Route} from "react-router";

// ** Routes
import {ProtectedRoute} from "@/routes/protected.route.tsx";

// ** Layouts
import DefaultLayout from "@/layouts/default-layout";

// ** Pages
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import ForbiddenPage from "@/pages/403";
import UserList from "@/pages/users/list";

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
                    <Route index path="/" element={<Dashboard/>}/>
                    <Route index path="/users" element={<UserList/>}/>
                </Route>

                <Route path='/login' element={<Login/>}/>
                <Route path='/403' element={<ForbiddenPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;