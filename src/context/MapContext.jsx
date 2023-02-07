import React, { createContext, useContext, useReducer } from 'react';

function mapReducer(state, action) {
    switch (action.type) {
        case 'SET_MAP':
            return { ...state, map: action.payload };
        /* falls through */
        case 'SET_CLUSTER':
            return { ...state, cluster: action.payload };
        /* falls through */
        case 'SET_PANO_MAP':
            return { ...state, panoMap: action.payload };
        /* falls through */
        case 'SET_TRACKING_LIST':
            return { ...state, trackingList: action.payload };
        /* falls through */
        case 'SET_SELECT_ITEM':
            return {
                ...state,
                selectItem: action.payload,
                pathMode: false,
                pathData: null,
                historyMode: false,
                selectPathItem: null,
            };
        /* falls through */
        case 'SET_PANO_ITEM':
            return { ...state, panoItem: action.payload };
        /* falls through */
        case 'SET_SATELLITE_MODE':
            return { ...state, satelliteMode: action.payload };
        /* falls through */
        case 'SET_STREET_MODE':
            return { ...state, streetMode: action.payload };
        /* falls through */
        case 'SET_STREET_LAYER':
            return { ...state, streetLayer: action.payload };
        /* falls through */
        case 'SET_HISTORY_MODE':
            return { ...state, historyMode: action.payload, logMode: false };
        /* falls through */
        case 'SET_PATH_MODE':
            return { ...state, pathMode: action.payload };
        /* falls through */
        case 'SET_PATH_DATA':
            return { ...state, pathMode: true, pathData: action.payload };
        /* falls through */
        case 'SET_SELECT_PATH_ITEM':
            return { ...state, selectPathItem: action.payload };
        /* falls through */
        case 'SET_TOTAL_EVENT_MODE':
            return { ...state, totalEventMode: action.payload };
        /* falls through */
        case 'SET_TOTAL_EVENT_COUNT':
            return { ...state, totalEventCount: action.payload };
        /* falls through */
        case 'SET_PANO_CLOSE':
            return { ...state, panoMap: null, panoItem: null, streetMode: false };
        /* falls through */
        case 'SET_IS_MAP_CLICKED':
            return { ...state, isMapClicked: !state.isMapClicked };

        case 'SET_LOG_ITEM':
            return { ...state, ...action.payload };
        /* falls through */
        case 'BLUR':
            if (state.pathMode && !state.selectPathItem) {
                return {
                    ...state,
                    selectPathItem: null,
                    pathData: null,
                    pathMode: false,
                    isMapClicked: !state.isMapClicked,
                    pathMarkerShow: true,
                };
            }
            if (state.pathMode) {
                return {
                    ...state,
                    selectPathItem: null,
                    isMapClicked: !state.isMapClicked,
                };
            }

            if (state.historyMode) {
                return {
                    ...state,
                    historyMode: false,
                    LogMode: false,
                    pathData: null,
                    isMapClicked: !state.isMapClicked,
                };
            }
            if (!state.selectItem) {
                return {
                    ...state,
                    isMapClicked: !state.isMapClicked,
                };
            }

            if (!state.pathMode) {
                return {
                    ...state,
                    selectItem: null,
                    isMapClicked: !state.isMapClicked,
                };
            }

        /* falls through */
        case 'HISTORY_BLUR':
            return {
                ...state,
                pathData: null,
                selectPathItem: null,
                pathMode: false,
                historyMode: false,
            };
        /* falls through */
        case 'SET_HIDE_PATH_MARKER':
            return {
                ...state,
                pathMarkerShow: !state.pathMarkerShow,
            };
        default:
            throw new Error('Unsupported action type:', action.type);
    }
}

const initialMapState = {
    map: null,
    panoMap: null,
    cluster: null,
    trackingList: [],
    selectItem: null,
    panoItem: null,
    satelliteMode: false,
    streetMode: false,
    streetLayer: null,
    pathMode: false,
    historyMode: false,
    pathData: null,
    selectPathItem: null,
    totalEventMode: null,
    totalEventCount: null,
    initialMapOptions: {
        lat: 35.1768,
        lng: 129.1253,
        zoom: 17,
    },
    isMapClicked: false,
    pathMarkerShow: true,
};

const MapContext = createContext();

export function MapProvider({ children }) {
    const [mapState, mapDispatch] = useReducer(mapReducer, initialMapState);

    return <MapContext.Provider value={{ mapState, mapDispatch }}>{children}</MapContext.Provider>;
}

export const useMap = () => useContext(MapContext);
