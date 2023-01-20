import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import View from '../../components/region/View';
import { MapProvider } from './../../context/RegionContext';

export default function ViewPage() {
    const { id } = useParams();
    const { data, isLoading } = useSWR(() => (id ? `/api/region?id=${id}` : null), fetcher);

    return (
        <MapProvider>
            <View data={data} />
        </MapProvider>
    );
}
