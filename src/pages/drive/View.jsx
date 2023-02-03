import React, { useState } from 'react';
import useFetch from './../../hook/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import View from './../../components/drive/View';

export default function ViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: terminalList } = useFetch('/api/terminal?mode=drive');
    const { data, isLoading } = useFetch(`/api/terminal?id=${id}`);

    const handleSubmit = (select) => {
        navigate(`/menu/drive/${select.unitid}`);
    };

    return <View data={data} terminalList={terminalList} handleSubmit={handleSubmit} />;
}
