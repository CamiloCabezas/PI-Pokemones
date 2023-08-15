import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import { useDispatch} from 'react-redux';
import  {getAllPokemons}  from "../../redux/actions/actions";
import styles from './landing.module.css'

const LandingPage = ({onstart}) => {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllPokemons());

    }, [])

    return(
        <div className={styles.container}>
            {/* <div className={styles.image}>
                <img src="https://es.web.img3.acsta.net/r_1280_720/pictures/14/07/18/10/57/567741.jpg"  />
            </div> */}
            <div className={styles.containerSmall}>
                <div className={styles.text}>
                <h1>Welcome to Pokeland</h1>
                </div>
                <Link className={styles.boton }onClick={() => {onstart()}}to={'/home'}>START</Link>
            </div>
        </div>
    )
}


export default LandingPage;