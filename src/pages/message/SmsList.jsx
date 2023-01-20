import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/message/SmsList';

export default function SmsList() {
    const { data, isLoading } = useSWR('/api/message?type=sms', fetcher);

    return <List data={data} isLoading={isLoading} />;
}
