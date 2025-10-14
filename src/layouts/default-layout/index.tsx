// ** React
import {Outlet} from "react-router";

const DefaultLayout = () => {
    return (
        <>
            header
            <Outlet />
            footer
        </>
    )
}

export default DefaultLayout