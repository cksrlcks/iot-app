import React from 'react';
import { useParams } from 'react-router-dom';
import ViewPage from './../../components/notice/View';
import useFetch from './../../hook/useFetch';

export default function View() {
    const { id } = useParams();
    const { data, isLoading } = useFetch(`/api/notice?id=${id}`);

    return <ViewPage data={data} />;
}
