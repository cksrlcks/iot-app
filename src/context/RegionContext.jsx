import React, { createContext, useContext, useReducer } from 'react';

function mapReducer(state, action) {
    switch (action.type) {
        case 'SET_MAP':
            return { ...state, map: action.payload };
        /* falls through */
        case 'SET_ADDR':
            return {
                ...state,
                addr: action.payload,
            };
        /* falls through */
        case 'SET_COORDS':
            return {
                ...state,
                coords: action.payload,
            };
        /* falls through */
        default:
            throw new Error('Unsupported action type:', action.type);
    }
}

const initialMapState = {
    map: null,
    coords: null,
    addr: null,
    initialMapOptions: {
        lat: 35.1768,
        lng: 129.1253,
        zoom: 16,
    },
};

const MapContext = createContext();

export function MapProvider({ children }) {
    const [mapState, mapDispatch] = useReducer(mapReducer, initialMapState);

    return <MapContext.Provider value={{ mapState, mapDispatch }}>{children}</MapContext.Provider>;
}

export const useMap = () => useContext(MapContext);
