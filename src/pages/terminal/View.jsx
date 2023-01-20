import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import { useParams } from 'react-router-dom';

import View from './../../components/terminal/View';

export default function ViewPage() {
    const { id } = useParams();
    const { data, isLoading } = useSWR(`/api/terminal?id=${id}`, fetcher);
    return <View data={data} />;
}
