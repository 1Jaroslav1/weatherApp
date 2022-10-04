import { useHttp } from "../hooks/http.hook";

const useWeatherService = () => {
    const {loading, request, error, clearError} = useHttp();
    const   _apiBase = "http://api.weatherapi.com/v1/",
            _apiKey = "fd9c2dbb197542d2926225957222602",
            _type_current = "current",
            _type_forecast = 'forecast'
        
    const getCityWeather = async (cityName, aqi = false) => {
        const url = `${_apiBase}${_type_current}.json?key=${_apiKey}&q=${cityName}&aqi=${aqi? "yes" : "no"}`;
        const res = await request(url);
        return _transformOneDayData(res);
    }
    
    const getCityForecast = async (cityName, days=1, aqi=false, alerts=false) => {
        const url = `${_apiBase}${_type_forecast}.json?key=${_apiKey}&q=${cityName}&days=${days}&aqi=${aqi? "yes" : "no"}&alerts=${alerts ? 'yes' : 'no'}`;
        const res = await request(url);
        return _transformForecastData(res);
    }

    const _transformOneDayData = (data) =>{
        return {
            name: data.location.name,
            country: data.location.country,
            localtime: data.location.localtime,
            condition: data.current.condition.text,
            feelslike: data.current.feelslike_c,
            humidity: data.current.humidity,
            temp: data.current.temp_c,
            wind: data.current.wind_kph,
            wind_degree: data.current.wind_degree,
            icon: data.current.condition.icon
        }
    }

    const _transformForecastData = (data) => {
        const baseData = _transformOneDayData(data);
        let transformedData = [baseData];

        data.forecast.forecastday.forEach((item) => {
            transformedData = [...transformedData, _transformOneDayForecast(item)];
        });

        return transformedData;
    }

    const _transformOneDayForecast = (data) => {
        const dayBase = {
            date: data.date,
            avgtemp: data.day.avgtemp_c,
            condition: data.day.condition.text,
            icon: data.day.condition.icon
        }

        let oneDayData = [dayBase];

        data.hour.forEach((item) => {
            oneDayData = [...oneDayData, _transformHourData(item)];
        });

        return oneDayData;
    }

    const _transformHourData = (data) => {
        return {
            time: data.time,
            temp_c: data.temp_c,
            condition: data.condition.text,
            icon: data.condition.icon,
            wind_kph: data.wind_kph,
            wind_degree: data.wind_degree,
            humidity: data.humidity
        }
    }

    return {loading, error, clearError, getCityWeather, getCityForecast};
}

export default useWeatherService;