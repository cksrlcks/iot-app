import React from 'react';
import List from './../../components/terminal/List';
import useFetch from './../../hook/useFetch';

export default function ListPage() {
    const { data, isLoading } = useFetch('/api/terminal');
    return <List data={data} isLoading={isLoading} />;
}
