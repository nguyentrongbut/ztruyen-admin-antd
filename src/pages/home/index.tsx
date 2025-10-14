// ** Hooks
import {useCurrentApp} from "@/hooks/useCurrentApp.ts";

const Home = () => {
    const {user} = useCurrentApp()

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

export default Home;