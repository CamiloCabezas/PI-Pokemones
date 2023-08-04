const CardPokemons = ({  name, image, types}) =>{
    return(
        <div>
            <img src={image} alt={`Imagen de ${name}`} />
            <h3>{name}</h3>
            <h5>{types}</h5>
        </div>
    )
}

export default CardPokemons