import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/message/SettingList';

export default function SettingList() {
    const { data, isLoading } = useSWR('/api/message', fetcher);
    return <List data={data} isLoading={isLoading} />;
}
