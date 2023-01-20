import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import Link from '../../components/region/Link';
import { useParams } from 'react-router-dom';

export default function LinkPage() {
    const { id } = useParams();
    const { data, isLoading } = useSWR(`/api/region?connect=${id}`, fetcher);
    return <Link data={data} />;
}
