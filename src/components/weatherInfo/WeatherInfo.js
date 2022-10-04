import {useState, useMemo, useRef, useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './WeatherInfo.scss'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import { useGetCityForecastMutation, transformForecast } from '../../api/api';
import { useGetFavouriteCitiesQuery, useRemoveCityMutation, useAddCityMutation } from "../../api/dataApi"; 
import { v4 as uuidv4 } from 'uuid';

import feelsLikeTemperatureIcon from '../../images/weather_icons/temperature.png';
import temperatureIcon from '../../images/weather_icons/temperatures.png';
import humidityIcon from '../../images/weather_icons/humidity.png';
import windIcon from '../../images/weather_icons/storm.png';
import windDirectionIcon from '../../images/weather_icons/wind-direction.png';
import Forecast from '../forecast/Forecast'

const WeatherInfo = () => {
    const [constCityName, setConstCityName] = useState("");
    const [aqi, setAqi] = useState(true);
    const inputRef = useRef("");

    const [
        getCityWeather,
        {
            data: cityData = [],
            isLoading,
            isSuccess,
            isError
        }
    ] = useGetCityForecastMutation();

    const [
        deleteCity
    ] = useRemoveCityMutation();

    const [
        addCity
    ] = useAddCityMutation();

    const {
        data: favoriteCitiesData = [],
        isLoading: favoriteCitiesIsLoading,
        isError: favoriteCitiesIsError,
        isSuccess: favoriteCitiesIsSuccess
    } = useGetFavouriteCitiesQuery();

    useEffect(() => {
        const cityName = localStorage.getItem("cityName");

        setConstCityName(cityName);
        getCityWeather({cityName, aqi});
        
        //eslint-disable-next-line
    }, [])

    const onSubmit = () => {
        const cityName = inputRef.current.value;

        localStorage.setItem("cityName", cityName);

        setConstCityName(cityName);
        getCityWeather({cityName, aqi});
    }

    const onEnter = (e) => {
        console.log(e.key);
        if(e.key === "Enter"){
            onSubmit();
        }
    }
    
    //eslint-disable-next-line
    const handleToggleClick = () => {
        setAqi((aqi) => !aqi);
    }

    const checkIfCityIsFavourite = useMemo(() => {
        let found = null;
        favoriteCitiesData.forEach(({id, name}) => {
            if(name === constCityName){
                found = id;
            }
        });
        return found;

    }, [constCityName, favoriteCitiesData]);

    const onLike = () => {
        const found = checkIfCityIsFavourite;

        if(found){
            deleteCity(found);
        } else{
            const newCity = {
                id: uuidv4(),
                name: constCityName
            };
            
            addCity(newCity).unwrap();
        }
    }

    const errorMessage = isError || favoriteCitiesIsError ? <ErrorMessage name={constCityName}/> : null;
    const spiner = isLoading && favoriteCitiesIsLoading ? <Spinner/> : null;

    const content = isSuccess && favoriteCitiesIsSuccess ? <InfoBody info={transformForecast(cityData)} onLike={onLike} liked={checkIfCityIsFavourite}/> : null;

    return (
        <div className='info'>
            <div className="info__input">
                {/* <div className="info__input-text">Air Quality Data</div>
                <input type="checkbox" id="switch" onChange={handleToggleClick} checked={aqi}/>
                <label htmlFor="switch"></label> */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Write city name: '
                    className='info__input-search'
                    onKeyPress={onEnter}
                />
                <button 
                    className='info__input-btn'
                    onClick={onSubmit}
                >
                    Search
                </button>
            </div>
            {errorMessage}
            {spiner}
            {content}
        </div>
    )
}

const InfoBody = ({info, onLike, liked}) => {
    const {name, country, localtime, condition, feelslike, humidity, temp, wind, wind_degree, icon, day} = info;
    
    return (
        <div className='info'>
            <div className="info__box">
                <div className="info__box-header">
                    <div className="info__box-city">
                        City: <span>{name}</span>
                    </div>
                    <div className="info__box-country">
                        Country: <span>{country}</span>
                    </div>
                    <div className="info__box-localtime">
                        Localtime: <span>{localtime}</span>
                    </div>
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title">
                        <img src={icon} alt="sun" />
                        Now is:</div>
                    <div className="info__box-item-descr">{condition}</div>
                    
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title">
                        <img src={feelsLikeTemperatureIcon} alt="feelslike temperature" />
                        Feels like temperature:
                    </div>
                    <div className="info__box-item-descr">{feelslike}°C</div>
                    
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title"><img src={temperatureIcon} alt="real temperature" /> Real temperature:</div>
                    <div className="info__box-item-descr">{temp}°C</div>
                    
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title"><img src={humidityIcon} alt="humidity" /> Humidity:</div>
                    <div className="info__box-item-descr">{humidity}%</div>
                    
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title"><img src={windIcon} alt="wind" /> Wind speed:</div>
                    <div className="info__box-item-descr">{wind} km/h</div>
                </div>
                <div className="info__box-item">
                    <div className="info__box-item-title"><img src={windDirectionIcon} alt="wind degree" /> Wind degree:</div>
                    <div className="info__box-item-descr">{wind_degree}°</div>
                </div>
                <div className={liked? "liked info__box-item info__like": "info__box-item info__like"}>
                    <i className="bi bi-heart-fill" onClick={onLike}></i>
                </div>
            </div>
            <Forecast data={day}/>
        </div>
    )
}

export default WeatherInfo;