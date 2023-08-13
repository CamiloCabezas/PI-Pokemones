import { useEffect, useState } from "react";
import axios from "axios";
import  {useNavigate} from 'react-router-dom';
import Select from 'react-select'


const validate = (input) => {
    let errors = {}; 

    if (input.name.length > 15) {
        errors.name = 'Write a short name';
    }
    if (!input.image) {
        errors.image = 'You need an image';
    }
    if (typeof input.hp !== 'number' && (input.hp <= 0 || input.hp > 60)) {
        errors.hp = 'Hp must be a number between 1 and 60';
    }
    if (typeof input.attack !== 'number' && input.attack < 0) {
        errors.attack = 'Attack must be a positive number';
    }
    if (typeof input.defense !== 'number' && (input.defense < 10 || input.defense > 60)) {
        errors.defense = 'Defense must be a number between 10 and 60';
    }

    return errors;
}

const CreatePokemon = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        getTypes()
    },[])

    const [ input, setInput ] = useState({
        name : '',
        image : '' ,
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types:[],
    })

    const [ error, setError ] = useState({})

    const [ types, setTypes ] = useState([])

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(`${name} ${typeof value}`);
        if(name === 'types'){
            setInput({
                ...input,
                types:[input.types,...value]
            })
            console.log(input.types);
        }
        setInput({
            ...input,
            [name]: value
        })
        setError(validate({
            ...input,
            [name]:value
        }))
    }

    const getTypes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/types')
            setTypes([...data])
        } catch (error) {
            window.alert('Hay un error con los tipos')
        }
        
    }

    const handleTypeChange = (selectedOptions) => {
        const selectedTypes = selectedOptions.map(option => option.value);
        // const typesFinally = selectedTypes.join(',')
        setInput({
            ...input,
            types: selectedTypes
        });
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(Object.keys(error));
        console.log(`${typeof input.types} hola`);
        if(Object.keys(error).length === 0){
            try {
                
                await axios.post('http://localhost:3001/pokemons', input)
                
                window.alert('Pokemon Created')
                navigate('/home')
            } catch (error) {
                window.alert(error.message)
            }
        }
    }



    return(
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input type="text" name='name' value={input.name}  onChange={handleChange} />
            {error.name && <p>{error.name}</p>}

            <label >Image: </label>
            <input type="text" name='image' value={input.image} onChange={handleChange}/>
            {error.image && <p>{error.image}</p>}

            <label>Hp: </label>
            <input type="number" name='hp' value={input.hp} onChange={handleChange}/>
            {error.hp && <p>{error.hp}</p>}

            <label>Attack: </label>
            <input type="number" name="attack" value={input.attack} onChange={handleChange}/>
            {error.attack && <p>{error.attack}</p>}

            <label>Defense: </label>
            <input type="number" name="defense" value={input.defense} onChange={handleChange}/>
            {error.defense && <p>{error.defense}</p>}

            <label>Speed: </label>
            <input type="number" name="speed" value={input.speed} onChange={handleChange} />

            <label>Height: </label>
            <input type="number" name="height" value={input.height} onChange={handleChange}/>

            <label>Weight: </label>
            <input type="number" name='weight' value={input.weight} onChange={handleChange}/>

            <label>Types: </label>
            <Select
                isMulti
                options={types.map(type => ({
                    value: type,
                    label: type
                }))}
                value={input.types.map(type => ({
                    value: type,
                    label: type
                }))}
                onChange={handleTypeChange}
            />


            <button type="submit">New Pokemon</button>

        </form>
    )
};

export default CreatePokemon;