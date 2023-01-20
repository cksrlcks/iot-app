import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/message/PushList';

export default function PushList() {
    const { data, isLoading } = useSWR('/api/message?type=push', fetcher);

    return <List data={data} isLoading={isLoading} />;
}
