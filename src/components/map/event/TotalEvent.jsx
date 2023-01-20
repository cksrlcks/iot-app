import React, { useEffect, useState, useRef } from 'react';
import { useMap } from '../../../context/MapContext';
import { CSSTransition } from 'react-transition-group';
import EventModal from './EventModal';
import useInfinite from './../../../hook/useInfinite';

export default function TotalEvent() {
    const { mapState, mapDispatch } = useMap();
    const { totalEventMode } = mapState;
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        mapDispatch({ type: 'SET_TOTAL_EVENT_MODE', payload: false });
    };
    useEffect(() => {
        setIsOpen(totalEventMode);
    }, [totalEventMode]);
    const handleSearch = (from, to) => {
        alert(`${from} ${to} 사이 이벤트 검색`);
    };

    const { data, hasNextPage, isLoading, totalCount, ref } = useInfinite('/api/event', 12);

    return (
        <CSSTransition in={isOpen} classNames="modal" timeout={500} unmountOnExit>
            <EventModal
                title="전체이벤트"
                handleClose={handleClose}
                handleSearch={handleSearch}
                loadMore={ref}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                data={data}
                totalCount={totalCount}
            />
        </CSSTransition>
    );
}
