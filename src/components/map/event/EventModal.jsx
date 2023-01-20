import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { formatDate } from '../../../lib/date';
import Datepicker from '../../multiSearch/Datepicker';
import CloseBtn from '../../button/CloseBtn';
import MultiSearch from '../../multiSearch';
import InfoTitle from '../../common/InfoTitle';
import EventCard from './EventCard';
import LoadingIcon from '../../../assets/img/common/icon-loading.svg';

export default function EventModal({
    title,
    handleClose,
    handleSearch,
    data,
    isLoading,
    loadMore,
    hasNextPage,
    totalCount,
}) {
    const modalRoot = document.getElementById('modal');
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));

    const handleSubmit = () => {
        if (new Date(startDate) > new Date(endDate)) {
            alert('종료일이 시작일보다 클 수 없습니다. 다시 선택해주세요');
            return false;
        }
        handleSearch(startDate, endDate);
    };

    return createPortal(
        <div className="common-modal list" onClick={handleClose}>
            <div className="modal-inner">
                <div className="modal-page" onClick={(e) => e.stopPropagation()}>
                    <div className="event-wrapper">
                        <div className="event-header">
                            <InfoTitle label={title} detail={totalCount} />
                            <CloseBtn onClick={handleClose} />
                        </div>
                        <MultiSearch label="검색" onClick={handleSubmit}>
                            <Datepicker
                                label="시작"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            <Datepicker
                                label="종료"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </MultiSearch>
                        <div className="event-body" data-body-scroll-lock-ignore>
                            <ul className="event-list">
                                {data?.map((item) => (
                                    <EventCard
                                        key={item.idx}
                                        name={item.unit_nm}
                                        date={item.makedate}
                                        content={item.event_code}
                                    />
                                ))}
                            </ul>
                            {isLoading && (
                                <div className="load-more">
                                    <img src={LoadingIcon} alt="loading" />
                                </div>
                            )}
                            {!isLoading && (
                                <div ref={loadMore} className="load-more">
                                    {!hasNextPage && '모두 불러왔습니다.'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
