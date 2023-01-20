import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/region/List';

export default function ListPage() {
    const { data, isLoading, mutate } = useSWR('/api/region', fetcher, {
        revalidateOnFocus: false,
    });

    return <List data={data} mutate={mutate} isLoading={isLoading} />;
}
