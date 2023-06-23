import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import PokeContainer from "../components/Pokedex/PokeContainer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles/Pokedex.css'
import Header from "../components/utils/Header";

const Pokedex = () => {
    const searchPokemon  = useRef()
    const navigate = useNavigate()

    const [selectValue, setSelectValue] = useState('all-pokemons')
    const trainerName = useSelector(states => states.trainerName)
    
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
    const [ pokemons, getAllPokemons, hasError, setPokemons ] = useFetch(url)
    const urlTypes = 'https://pokeapi.co/api/v2/type'
    const [ types, getAllTypes ] = useFetch(urlTypes)

    const [initialPage, setInitialPage] = useState(1)
    const contentPerPage = 10
    const indexOfLastItem = initialPage * contentPerPage
    const indexOfFirstItem = indexOfLastItem - contentPerPage
    const initialItems = pokemons?.results.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        if (selectValue === 'all-pokemons') {
        getAllPokemons()
        } else {
        axios.get(selectValue)
            .then(res => {
            const data = {
                results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
            }
            setPokemons(data)
            })
            .catch(err => console.log(err))
        }
    }, [selectValue])

        useEffect(() => {
            getAllTypes()
        }, [])


    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = searchPokemon.current.value.trim().toLowerCase()
        navigate(`/pokedex/${inputValue}`)
    }

    const handleChangeType = e => {
        setSelectValue(e.target.value)
    }


    return (
        <div className="pokedex">
            <Header/>
            <p className="pokedex__presentation"><span>Welcome {trainerName} !</span> , you can find your favorite pokemon</p>
            <form className="pokedex__form" onSubmit={handleSubmit}>
                <input className="pokedex__input" ref={searchPokemon} type="text" placeholder="    Find your favorite Pokemon"/>
                <button className="pokedex__btn">Search</button>

                <select className="pokedex__selector" onChange={handleChangeType}>
                    <option className="pokedex__selector-items" value='all-pokemons'>All pokemons</option>
                    {
                        types?.results.map(typeInfo => (
                            <option className="other_type"
                            value={typeInfo.url}
                            key={typeInfo.url}
                            >{typeInfo.name}</option>
                            ))
                    }
                </select>
                
            </form>
            
            <PokeContainer 
                pokemons={pokemons?.results}
                initialItems={initialItems}
                setInitialPage={setInitialPage}
                initialPage={initialPage}
                contentPerPage={contentPerPage}
            />
        </div>
    )
};

export default Pokedex;
