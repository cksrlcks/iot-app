import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/notice/Lists';

export default function NoticeList() {
    const { data, isLoading } = useSWR('/api/notice', fetcher);

    return <List data={data} isLoading={isLoading} />;
}
