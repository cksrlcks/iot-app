import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import List from '../../components/log/List';

export default function ListPage() {
    const [target, setTarget] = useState(null);
    const { data: terminalList } = useSWR('/api/log/list', fetcher);
    const { data, isLoading } = useSWR(`/api/log${target ? `?id=${target.unitid}` : ''}`, fetcher);

    const handleSubmit = (select) => {
        setTarget(select);
    };

    return (
        <List
            terminalList={terminalList}
            data={data}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
        />
    );
}
