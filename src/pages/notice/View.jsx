import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import { useParams } from 'react-router-dom';
import ViewPage from './../../components/notice/View';

export default function View() {
    const { id } = useParams();
    const { data, isLoading } = useSWR(`/api/notice?id=${id}`, fetcher);

    return <ViewPage data={data} />;
}
