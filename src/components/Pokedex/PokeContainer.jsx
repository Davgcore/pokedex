import PokeCard from "./PokeCard"
import './styles/PokeContainer.css'

const PokeContainer = ({ pokemons, initialItems, setInitialPage, initialPage, contentPerPage }) => {
        const previousPage = () => {
            setInitialPage((prevPage)  => prevPage -1 )
        }
        
        const nextPage = () => {
            setInitialPage((prevPage) => prevPage + 1)
            console.log(((initialPage+1)*10) , pokemons?.length)
        }
    return (
        <div className="poke__body">
            <div className="poke__container">
                {
                    initialItems?.map(pokemon => (
                        <PokeCard 
                            key={pokemon.name} 
                            url = {pokemon.url} 
                        />
                    ))
                    
                }
            </div>
            <div>
                <footer className="pagination__footer">
                    <div className={'child-to-body ' + ((initialPage === 1)?'btn-disabled':'')} onClick={previousPage}>
                        <div className="poke_box">
                            <div className="pokeball">
                                <span className={'poke_box_text ' + ((initialPage === 1)?'btn-disabled':'')}><box-icon name='skip-previous' color="white" size="md"></box-icon></span>
                                <div className="pokeball__button"></div>
                            </div>   
                        </div>
                    </div>
                    <span className="pagination__pages">{ initialPage }</span>
                    <div className={'child-to-body ' + (((initialPage*10) >= pokemons?.length)?'btn-disabled':'')} onClick={nextPage}>
                        <div className="poke_box">
                            <div className="pokeball">
                                <span className={'poke_box_text ' + ((initialItems?.length >= contentPerPage)?'':'btn-disabled')}><box-icon name='skip-next' color="white" size="md" ></box-icon></span>
                                <div className="pokeball__button"></div>
                            </div>   
                        </div>
                    </div>
                </footer>
            </div>
        </div> 
    )
}

export default PokeContainer