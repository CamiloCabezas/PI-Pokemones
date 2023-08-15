import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import { useDispatch} from 'react-redux';
import  {getAllPokemons}  from "../../redux/actions/actions";

const LandingPage = ({onstart}) => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllPokemons());

    }, [])

    return(
        <div>
            <h1>Hola Bienvenidos a Todos</h1>
            <Link onClick={() => {onstart()}}to={'/home'}>START</Link>
        </div>
    )
}


export default LandingPage;