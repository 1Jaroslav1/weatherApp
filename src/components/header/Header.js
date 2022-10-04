import {useState} from 'react'
import { Divide as Hamburger } from 'hamburger-react'
import './Header.scss'
import {NavLink} from 'react-router-dom';

const Header = () => {
    const [isOpen, setOpen] = useState(false);
    
    return (
        <header>
            <div className="hamburger">
                <Hamburger toggled={isOpen} toggle={setOpen} size={30} color="#001D4A"/>
            </div>

            <div className="title">
                <h1>
                    WeatherApp
                </h1>
                <h1>
                    WeatherApp
                </h1>
            </div>

            <div className={isOpen? "menu show" : "menu"}>
                <div className="menu__list">
                    <div className="menu__item"><NavLink exact activeStyle={{'color': '#80CED7'}} to="/">Weather now</NavLink></div>
                    <div className="menu__item"><NavLink exact activeStyle={{'color': '#80CED7'}} to="/favourite_cities">Favourite</NavLink></div>
                    <div className="menu__item"><NavLink exact activeStyle={{'color': '#80CED7'}} to="/about">About</NavLink></div>
                </div>
            </div>
        </header>
    )
}

export default Header;