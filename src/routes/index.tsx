// ** React router
import {BrowserRouter as Router, Routes, Route} from "react-router";

// ** Routes
import {ProtectedRoute} from "@/routes/protected.route.tsx";

// ** Layouts
import DefaultLayout from "@/layouts/default-layout";

// ** Pages

// Login
import Login from "@/pages/login";
import ForbiddenPage from "@/pages/403";

// Dashboard
import Dashboard from "@/pages/dashboard";

// User
import UserList from "@/pages/users/list";
import TrashUserList from "@/pages/users/trash";

// Genres
import GenresList from "@/pages/genres/list";
import TrashGenreList from "@/pages/genres/trash";

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
                    {/* Dashboard */}
                    <Route index path="/" element={<Dashboard/>}/>

                    {/* Users */}
                    <Route index path="/users" element={<UserList/>}/>
                    <Route index path="/users/trash" element={<TrashUserList/>}/>

                    {/* Genres */}
                    <Route index path="/genres" element={<GenresList/>}/>
                    <Route index path="/genres/trash" element={<TrashGenreList/>}/>
                </Route>

                <Route path='/login' element={<Login/>}/>
                <Route path='/403' element={<ForbiddenPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;