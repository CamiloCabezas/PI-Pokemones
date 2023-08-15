import styles from './paginacion.module.css'
import { useState } from 'react'

const Paginacion = ({page, setPage, max}) => {
    const [input, setInput ] = useState(1);

    let pages = [];

    for(let i = 1; i <= max; i++){
        pages.push(i);
    }

    const nextPage = () => {
        if(input < max){
            setInput(input + 1)
            setPage(page + 1)
        }
    }

    const prevPage = () => {
        if(input > 1){
            setInput(input - 1)
            setPage(page - 1)
        }
    }
    // const handlerChange = (event) => {
    //     setInput(event.target.value)
    // }

    const handlerClick = (n) =>{
        setPage(n)
    }




    return(
        <div className={styles.container}>
            <button className={styles.previousPage} onClick={prevPage}>Prev</button>
            {/* <input className={styles.nose} name={page} autoComplete='off' value={input} onChange={handlerChange}/> */}
            {
                pages?.map((page, index) => {
                    return <button key={index} onClick={() => handlerClick (page)}>{page}</button>
                })
            }           
            <button className={styles.nextPage} onClick={nextPage}>Next</button>
        </div>
    )
}

export default Paginacion;