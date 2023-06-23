import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokemonCard.css'
import Chart from '../components/Pokedex/Chart'
import Header from "../components/utils/Header"

const PokedexName = () => {
    window.scrollTo(0, 0);
    const { name } = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const [ pokemon, getPokemonByName, hasError ] = useFetch(url)

    useEffect(() => {
        getPokemonByName()
    }, [name])


return (
    <>
        <div className="card-body">
            {
                hasError
                ? 
                <>
                    <Header/>
                    <div className="pokedex__sorry-container">
                        <h1 className="pokedex__sorry">
                        <p className="pokedex__sorry-title">Really sorry but <span>"{name}"</span> doesn't exist</p>
                        <div>
                            <img className="pokedex__sorry-img" src="https://i.pinimg.com/736x/4c/e4/f9/4ce4f9eca064585f136659a3a503226f.jpg" alt="" />
                        </div>
                        <p className="pokedex__search">{name}</p>
                        </h1>
                    </div>
                </>
                
                : (
                    <>
                        <div className="pokemon_card">
                            <header className="pokemon_header">
                                <img className="pokemon_header-img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                            </header>

                            <div className="pokemon_name-container">
                                <hr className="pokemon_line" /><h2 className={`pokemon_name ${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2><hr className="pokemon_line" />
                            </div>

                            <div className="pokemon_feature">
                                <ul className="pokemon_feature-list">
                                    <li className="pokemon_feature-item">
                                        <span className="pokemon_feature-info">Weight</span>
                                        <span className="pokemon_feature-info-num">{pokemon?.weight}</span>
                                    </li>
                                    <hr className="line" />
                                    <li className="pokemon_feature-item">
                                        <span className="pokemon_feature-info">Height</span>
                                        <span className="pokemon_feature-info-num">{pokemon?.height}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pokemon_titleInfo">
                                <ul className="pokemon_titleInfo-list">
                                    <h4 className="pokemon_titleInfo-title">Type</h4>
                                    {
                                        pokemon?.types.map(typeInfo => (
                                            <li className={`pokemon_titleInfo-info1 cl-${pokemon?.types[0].type.name}`} 
                                            key={typeInfo.type.url}> 
                                            {typeInfo.type.name}</li>
                                        ))
                                    }
                                </ul>
                                <ul className="pokemon_titleInfo-list">
                                    <h4 className="pokemon_titleInfo-title">Abilities</h4>
                                        {
                                            pokemon?.abilities.map(ability => (
                                                <li className="pokemon_titleInfo-info1"
                                                key={ability.ability.url}>
                                                {ability.ability.name}</li>
                                            ))
                                        }
                                </ul>
                            </div>

                            <div className="chart">
                                <p className="stats">stats</p>
                                {pokemon && <Chart pokemon={pokemon} />}
                            </div>  
                            
                            <div className="moves">
                                <p className="tittle_move">MOVES</p>    
                                {pokemon?.moves.map((movesInfo, index) => (
                                    <li className='list_moves' key={index}>{movesInfo.move.name}</li>
                                ))}
                            </div>   
                        </div>
                    </>
                    
                )
            }
        </div>
    </>
)
}

export default PokedexName