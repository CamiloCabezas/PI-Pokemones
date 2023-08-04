import { Link } from "react-router-dom";


const LandingPage = () => {
    return(
        <div>
            <h1>Hola Bienvenidos a Todos</h1>
            <Link to={'/home'}>START</Link>
        </div>
    )
}


export default LandingPage;