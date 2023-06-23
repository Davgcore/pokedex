import { useRef } from "react"
import './styles/Home.css'
import { useDispatch, useSelector } from "react-redux"
import { setTrainerNameG } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"
import Header from "../components/utils/Header"

const Home = () => {

    //? importante useSelector para traer los estados 
    const trainerName = useSelector((state) => state.trainerNameSlice)



    const navigate = useNavigate() // se usa para navegar entre rutas
    const userName = useRef() // value del input
    const dispacth = useDispatch() // empaquetador de las actions globales


    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(setTrainerNameG(userName.current.value.trim()))
        userName.current.value = ''
        navigate('/pokedex')
    }


    return (
        <div>
            <Header/>
            <div className="home">
                <div className="home__img-container">
                    <img className="home__img" src="./logopokedex.svg" alt="" />
                    <h2 className="home__title">Hi Trainer!</h2>
                    <p className="home__body">Place your name and we can start</p>
                    <form className="home__form" onSubmit={handleSubmit}>
                        <input className="home__input" ref={userName} type="text" placeholder="  Name..."/>
                        <button className="home__btn">Start</button>
                    </form>
                </div>
                <div className="home__footer">
                    <img src="./footerpokedex.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home