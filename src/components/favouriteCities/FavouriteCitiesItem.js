import { useGetCityWeatherQQuery } from "../../api/api";
import Spinner from "../spinner/Spinner";
import {transformOneDayData} from '../../api/api';
import "./FavouriteCities.scss"
import React from 'react';

const FavouriteCitiesItem = ({cityName, aqi, handleDeleteClick}) => {
    const{
        data: cityData = [],
        isLoading,
        isSuccess,
        isError
    } = useGetCityWeatherQQuery(cityName, aqi);



    if(isLoading){
        return <Spinner/>
    }

    if(isError){
        return;
    }

    if(isSuccess){
        const {name, temp, condition, icon} = transformOneDayData(cityData);
        return (
            <li className="list__item">
                <div className="list__item-name">
                    {name}
                </div>
                <div className="list__item-info">
                    <div className="list__item-temp">
                        <span>{temp}</span><sup>°C</sup>
                    </div>
                    <div className="list__item-condition">
                        {condition}
                    </div>
                    <img src={icon} alt="conditionIcon" className="list__item-icon" />
                </div>
                <div className="list__item_close" onClick={handleDeleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                </div>
            </li>
        )
    } 
};

export default FavouriteCitiesItem;