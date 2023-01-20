import React, { useState } from 'react';
import ListPage from './../layout/ListPage';
import MultiSearch from './../multiSearch/index';
import Select from './../multiSearch/Select';
import Datepicker from './../multiSearch/Datepicker';
import InfoTitle from './../common/InfoTitle';
import ListWrapper from '../board/List';
import { formatDate } from './../../lib/date';
import Item from './Item';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';

export default function List({ terminalList, data, handleSubmit, isLoading }) {
    const [select, setSelect] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()));

    const handleChange = (item) => {
        setSelect(item);
    };

    const scrollRestore = () => {
        document.querySelector('.app-safearea').scroll({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <ListPage
            title="운행일지"
            search={
                <MultiSearch
                    label="검색"
                    onClick={() => {
                        scrollRestore();
                        handleSubmit(select);
                    }}
                >
                    <Select
                        label="단말기명"
                        value={select}
                        data={terminalList}
                        onChange={handleChange}
                    />
                    <Datepicker label="운행일자" value={date} onChange={(date) => setDate(date)} />
                </MultiSearch>
            }
        >
            <div className="app-inner">
                <InfoTitle label="검색결과" detail={data?.lists.length} />
                <ListWrapper>
                    {isLoading && (
                        <div className="load-more">
                            <img src={LoadingIcon} alt="loading" />
                        </div>
                    )}
                    {data && data.lists.map((item) => <Item key={item.idx} item={item} />)}
                </ListWrapper>
            </div>
        </ListPage>
    );
}
