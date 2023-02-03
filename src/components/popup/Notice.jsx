import React from 'react';
import Popup from './Popup';
import useFetch from './../../hook/useFetch';

export default function Notice({ splash }) {
    const { data } = useFetch('/api/popup');
    return <Popup data={data} type="notice" />;
}
