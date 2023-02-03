import React from 'react';
import List from '../../components/notice/Lists';
import useFetch from './../../hook/useFetch';

export default function NoticeList() {
    const { data, isLoading } = useFetch('/api/notice');

    return <List data={data} isLoading={isLoading} />;
}
