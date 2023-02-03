import React from 'react';
import useFetch from './../../hook/useFetch';
import List from './../../components/drive/List';

export default function ListPage() {
    const { data, isLoading } = useFetch('/api/terminal');
    return <List data={data} isLoading={isLoading} />;
}
