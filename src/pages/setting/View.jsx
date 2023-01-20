import React from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import View from './../../components/setting/View';
import { useAuth } from '../../context/AuthContext';

export default function ViewPage() {
    const { user } = useAuth();
    const { data, isLoading } = useSWR(`/api/user?id=${user.userId}`, fetcher);
    return <View data={data} />;
}
