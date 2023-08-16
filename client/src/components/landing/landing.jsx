import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import { useDispatch} from 'react-redux';
import  {getAllPokemons}  from "../../redux/actions/actions";
import styles from './landing.module.css'

const LandingPage = ({onstart}) => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllPokemons());

    }, [dispatch])

    return(
        <div className={styles.container}>
            <div className={styles.containerSmall}>
                <div className={styles.text}>
                <h1>Welcome to Pokeland</h1>
                </div>
                <Link className={styles.boton }onClick={() => {onstart()}}to={'/home'}>START</Link>
            </div>
            <div className={styles.image}>
                <img src="https://www.elheraldo.co/sites/default/files/styles/widht_760/public/articulo/2016/07/07/ash_y_pokemons_0.jpg?itok=yVrZII7i"  />
            </div>
        </div>
    )
}


export default LandingPage;