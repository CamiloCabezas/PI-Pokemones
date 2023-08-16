import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokeByName, claenState, getAllPokemons } from "../../redux/actions/actions";
import styles from './SearchBar.module.css';

const SearchBar = () => {

  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  const tohome = () => {
    dispatch(claenState())
    dispatch(getAllPokemons())
  }

  return (
    <div className={`${styles.nav} ${styles.customSearchBar}`}>
      <div>
      <Link to={'/create'} className={styles.createLink}>
        Create
      </Link>
      </div>
      <div className={styles.barra}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="search"
            value={nombre}
            onChange={handleChange}
            placeholder="Nombre del Pokemon"
          />
          <label className={styles.label} htmlFor="input">
            Enter Your Name
          </label>
          <div className={styles.topline}></div>
          <div className={styles.underline}></div>
        </div>
      </div>
      <div className={styles.search}>
        <Link
          onClick={() => {
            dispatch(getPokeByName(nombre));
            setNombre('');
          }}
          to={'/home'}
        >
          <button className={`${styles.button} ${styles.redButton}`}>
            <svg className={styles.svgIcon} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
            </svg>
            Search
          </button>
        </Link>
      </div>
      <div className={styles.home}>
        <Link to={'/home'} onClick={() => { tohome() }} >
          <button className={styles.homeButton} alt="home">
            <i>H</i>
            <i>o</i>
            <i>m</i>
            <i>e</i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;


  