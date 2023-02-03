import React from 'react';
import List from '../../components/message/PushList';
import useFetch from './../../hook/useFetch';

export default function PushList() {
    const { data, isLoading } = useFetch('/api/message?type=push');

    return <List data={data} isLoading={isLoading} />;
}
