import React from 'react';
import View from './../../components/setting/View';
import { useAuth } from '../../context/AuthContext';
import useFetch from './../../hook/useFetch';

export default function ViewPage() {
    const { user } = useAuth();
    const { data, isLoading } = useFetch(`/api/user?id=${user.userId}`);
    return <View data={data} />;
}
