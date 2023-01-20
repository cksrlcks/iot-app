import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from './../../components/drive/List';

export default function ListPage() {
    const { data, isLoading } = useSWR('/api/terminal', fetcher);
    return <List data={data} isLoading={isLoading} />;
}
