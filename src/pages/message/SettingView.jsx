import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import { useParams } from 'react-router-dom';
import View from './../../components/message/SettingView';

export default function SettingView() {
    const { id } = useParams();
    const { data, isLoading } = useSWR(`/api/message?id=${id}`, fetcher);
    return <View data={data} />;
}
