import React from 'react';
import Popup from './Popup';
import useFetch from './../../hook/useFetch';

export default function Urgent() {
    const { data } = useFetch('/api/urgent');

    return <Popup data={data} type="urgent" />;
}
