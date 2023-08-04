import CardPokemons from "../Card/card";

const CardsPokemons = ({characters}) =>{


    return(
        <div>
            {
                characters.map((character, index) => {
                    return(
                        <div key={index}>
                            <CardPokemons
                            name={character.name}
                            image={character.image}
                            types={character.types}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardsPokemons;