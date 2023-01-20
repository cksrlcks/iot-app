import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import { useParams, useNavigate } from 'react-router-dom';

import View from './../../components/drive/View';

export default function ViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: terminalList } = useSWR('/api/terminal?mode=drive', fetcher);
    const { data, isLoading } = useSWR(`/api/terminal?id=${id}`, fetcher);

    const handleSubmit = (select) => {
        navigate(`/menu/drive/${select.unitid}`);
    };

    return <View data={data} terminalList={terminalList} handleSubmit={handleSubmit} />;
}
