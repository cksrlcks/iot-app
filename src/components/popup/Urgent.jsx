import React from 'react';
import Popup from './Popup';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';

export default function Urgent() {
    const { data } = useSWR('/api/urgent', fetcher);

    return <Popup data={data} type="urgent" />;
}
