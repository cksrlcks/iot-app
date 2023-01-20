import React from 'react';
import Popup from './Popup';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';

export default function Notice({ splash }) {
    const { data } = useSWR('/api/popup', fetcher);
    const handleOneDay = () => {};

    if (!splash) {
        return <Popup data={data} handleOneDay={handleOneDay} type="notice" />;
    }
    return null;
}
