import React from 'react';
import { useParams } from 'react-router-dom';

import View from './../../components/terminal/View';
import useFetch from './../../hook/useFetch';

export default function ViewPage() {
    const { id } = useParams();
    const { data, isLoading } = useFetch(`/api/terminal?id=${id}`);
    return <View data={data} />;
}
