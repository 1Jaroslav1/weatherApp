import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './FavouriteCities.scss';
import { useGetFavouriteCitiesQuery } from "../../api/dataApi"; 
import { useRemoveCityMutation } from "../../api/dataApi";
import FavouriteCitiesItem from "./FavouriteCitiesItem";
import { useCallback } from "react";

const FavouriteCities = () => {
    const {
        data: citiesData = [],
        isLoading,
        isError,
        isSuccess
    } = useGetFavouriteCitiesQuery();

    const [
        deleteCity
    ] = useRemoveCityMutation();

    const handleDeleteClick = useCallback((id) => {
        deleteCity(id);
    
        // eslint-disable-next-line
    }, []);

    const renderItems = (citiesData) => {
        const list = citiesData.map(({id, name, aqi}) => {
            return <FavouriteCitiesItem key={id} cityName={name} aqi={aqi} handleDeleteClick={() => handleDeleteClick(id)}/>
        });
        
        return (
            <ul className="list__wrapper">
                {list}
            </ul>
        )
    }

    const errorMessage = isError ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const items = isSuccess ? renderItems(citiesData) : null;

    return (
        <div className="list">
            {items}
            {spinner}
            {errorMessage}
        </div>
    )
}


export default FavouriteCities;