import './Forecast.scss';

import {transformForecastHour} from '../../api/api';
import { useState, useEffect, } from 'react';

const Forecast = (data) => {
    const [hourArray, setHourArray] = useState([]);

    useEffect(() => {
        const newHourArray = [];
        data.data.forEach((item, i) => {
            item.hour.forEach((hour) => {
                const today = new Date();
    
                const hourMinute = hour.time.split(" ")[1].split(":");
                // console.log(hour)
                // console.log("i=", i);
                // console.log(today.getHours(), " ", parseInt(hourMinute[0]));
                if(today.getHours() < parseInt(hourMinute[0]) && i === 0){
                    newHourArray.push(hour);
                }
    
                if(today.getHours() >= parseInt(hourMinute[0]) && i === 1){
                    newHourArray.push(hour);
                }
            });
        });

        setHourArray(newHourArray);

        // eslint-disable-next-line
    }, [data])

    const content = hourArray.map((item, i) => {
        return(
            <ForecastItem data={item} key={i} />
        )
    })


    return (
        <div className="forecast">
            <div className="forecast__title">
                Forecast
            </div>
           <div className="forecast__wrapper">
                {content}
           </div>
           <div className="forecast__click-text">Press 'Shift' and scroll</div>
        </div>
    )
}


const ForecastItem = (data) => {
    const {hour, temp, icon, chanceOfRain} = transformForecastHour(data);

    const hourMinute = hour.split(" ")[1];

    return(
        <div className="forecast__item">
            <div className="forecast__item-hour">
                {hourMinute}
            </div>
            <div className="forecast__item-temp">
                {temp}°C
            </div>
            <div className="forecast__item-icon">
                <img src={icon} alt="icons" />
            </div>
            <div className="forecast__item-chanceOfRain">
                {chanceOfRain} %
            </div>
        </div>
    )

}

export default Forecast;
