import React from 'react';
import { useParams } from 'react-router-dom';
import View from './../../components/message/SettingView';
import useFetch from './../../hook/useFetch';

export default function SettingView() {
    const { id } = useParams();
    const { data, isLoading } = useFetch(`/api/message?id=${id}`);
    return <View data={data} />;
}
