import React from 'react';
import List from '../../components/message/SettingList';
import useFetch from './../../hook/useFetch';

export default function SettingList() {
    const { data, isLoading } = useFetch('/api/message');
    return <List data={data} isLoading={isLoading} />;
}
