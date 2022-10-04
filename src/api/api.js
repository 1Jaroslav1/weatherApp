import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const   _apiKey = "fd9c2dbb197542d2926225957222602",
        _type_current = "current",
        _type_forecast = 'forecast';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.weatherapi.com/v1/'
    }),
    endpoints: builder => ({
        getCityWeather: builder.mutation({
            query: ({cityName, aqi}) => {
                return ({
                    url: `${_type_current}.json?key=${_apiKey}&q=${cityName}&aqi=${aqi? "yes" : "no"}`,
                    method: 'GET'
                })
            },
        }),
        getCityWeatherQ: builder.query({
            query: (cityName, aqi) => {
                return ({
                    url: `${_type_current}.json?key=${_apiKey}&q=${cityName}&aqi=${aqi? "yes" : "no"}`,
                    method: 'GET'
                })
            },
        }),
        getCityForecast: builder.mutation({
            query: ({cityName, aqi}) => {
                console.log(cityName);
                return ({
                    url: `${_type_forecast}.json?key=${_apiKey}&q=${cityName}&days=2&aqi=${aqi? "yes" : "no"}`,
                    method: 'GET'
                })
            }
        })
    })
});

export const transformOneDayData = (data) =>{
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

export const transformForecast = (data) => {
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
        icon: data.current.condition.icon,
        day: data.forecast.forecastday
    }
}

export const transformForecastHour = (data) => {
    return {
        hour: data.data.time,
        temp: data.data.temp_c,
        icon: data.data.condition.icon,
        chanceOfRain: data.data.chance_of_rain,
        humidity: data.data.humidity
    }
}


export const {useGetCityWeatherMutation, useGetCityWeatherQQuery, useGetCityForecastMutation} = apiSlice;