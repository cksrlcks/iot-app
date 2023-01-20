import React, { useRef, useState, useEffect } from 'react';
import EventModal from '../event/EventModal';
import useInfinite from './../../../hook/useInfinite';

export default function ItemEvent({ item, isEventModal }) {
    const { data, hasNextPage, isLoading, totalCount, ref } = useInfinite(
        '/api/event',
        12,
        item.unitid
    );

    const handleClose = () => {
        isEventModal(false);
    };

    const handleSearch = (from, to) => {
        alert(`${from} ${to} 사이 이벤트 검색`);
    };
    return (
        <EventModal
            title="이벤트"
            detail={item.unitnm}
            handleClose={handleClose}
            handleSearch={handleSearch}
            data={data}
            loadMore={ref}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            totalCount={totalCount}
        />
    );
}
