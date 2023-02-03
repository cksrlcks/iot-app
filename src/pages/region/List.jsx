import React from 'react';
import List from '../../components/region/List';
import useFetch from './../../hook/useFetch';

export default function ListPage() {
    const { data, isLoading, mutate } = useFetch('/api/region', {
        revalidateOnFocus: false,
    });

    return <List data={data} mutate={mutate} isLoading={isLoading} />;
}
