import React, { useState } from 'react';
import ListWrapper from '../board/List';
import Item from './MessageItem';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';
import Datepicker from './../multiSearch/Datepicker';
import MultiSearch from './../multiSearch/index';
import { formatDate } from './../../lib/date';
import InfoTitle from '../common/InfoTitle';

export default function PushList({ data, isLoading }) {
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const handleSubmit = () => {
        console.log(`${startDate}~${endDate}사이의 내역을 가져옵니다`);
    };
    return (
        <ListWrapper>
            <div className="app-inner">
                <MultiSearch
                    label="검색"
                    className="message-search"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
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
                <InfoTitle label="검색결과" detail={data?.length} />

                {isLoading && (
                    <div className="load-more">
                        <img src={LoadingIcon} alt="loading" />
                    </div>
                )}
                {data && data.map((item) => <Item key={item.idx} item={item} />)}
            </div>
        </ListWrapper>
    );
}
