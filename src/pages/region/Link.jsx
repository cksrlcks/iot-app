import React from 'react';
import Link from '../../components/region/Link';
import { useParams } from 'react-router-dom';
import useFetch from './../../hook/useFetch';

export default function LinkPage() {
    const { id } = useParams();
    const { data, isLoading } = useFetch(`/api/region?connect=${id}`);
    return <Link data={data} />;
}
