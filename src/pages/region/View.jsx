import React from 'react';
import { useParams } from 'react-router-dom';
import View from '../../components/region/View';
import { MapProvider } from './../../context/RegionContext';
import useFetch from './../../hook/useFetch';

export default function ViewPage() {
    const { id } = useParams();
    const { data, isLoading } = useFetch(id ? `/api/region?id=${id}` : null);

    return (
        <MapProvider>
            <View data={data} />
        </MapProvider>
    );
}
