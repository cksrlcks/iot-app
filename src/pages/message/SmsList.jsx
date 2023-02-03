import React from 'react';
import List from '../../components/message/SmsList';
import useFetch from './../../hook/useFetch';

export default function SmsList() {
    const { data, isLoading } = useFetch('/api/message?type=sms');

    return <List data={data} isLoading={isLoading} />;
}
