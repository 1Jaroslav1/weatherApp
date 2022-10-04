import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const dataApiSlice = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['FavouriteCities'],
    endpoints: builder => ({
        getFavouriteCities: builder.query({
            query: () => '/favoriteCities',
            providesTags: ['FavouriteCities']
        }),
        removeCity: builder.mutation({
            query: id => ({
                url: `/favoriteCities/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['FavouriteCities']
        }),
        addCity: builder.mutation({
            query: city => ({
                url: '/favoriteCities',
                method: 'POST',
                body: city
            }),
            invalidatesTags: ['FavouriteCities']
        })
    })
});


export const {useGetFavouriteCitiesQuery, useAddCityMutation, useRemoveCityMutation} = dataApiSlice;