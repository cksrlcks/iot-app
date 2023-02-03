import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getPhoneNumber } from './../../lib/mapHelper';
import ListPage from './../layout/ListPage';
import MultiSearch from './../multiSearch/index';
import Select from './../multiSearch/Select';
import ListWrapper from '../board/List';
import Modal from './Modal';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';
import IconStart from '../../assets/img/drive/icon-start.svg';
import IconStop from '../../assets/img/drive/icon-stop.svg';

export default function View({ terminalList, data, handleSubmit, isLoading }) {
    const [select, setSelect] = useState('');
    const [stop, setStop] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setSelect(data);
        }
    }, [data]);

    const handleChange = (item) => {
        setSelect(item);
        handleSubmit(item);
    };

    const handleConfirm = () => {
        setOpen(false);
        setTimeout(function () {
            setStop((prev) => !prev);
        }, 500);
    };
    return (
        <ListPage
            title="운행체크"
            search={
                <MultiSearch label="검색">
                    <Select
                        label="단말기명"
                        value={data}
                        data={terminalList}
                        onChange={handleChange}
                        allMode={false}
                        color="purple"
                    />
                </MultiSearch>
            }
        >
            <div className="app-inner">
                <ListWrapper>
                    {isLoading && (
                        <div className="load-more">
                            <img src={LoadingIcon} alt="loading" height={46} />
                        </div>
                    )}
                    {data && (
                        <li className="drive-card">
                            <div className="drive-info">
                                <div className="badge">기사명</div>
                                <div className="name">{data.driver_nm}</div>
                                <div className="info-item">
                                    <div className="label">차량명</div>
                                    <div className="content">{data.unit_sn}</div>
                                </div>
                                <div className="info-item">
                                    <div className="label">단말기</div>
                                    <div className="content">{getPhoneNumber(data.unitid)}</div>
                                </div>
                            </div>
                            <div className="drive-btn">
                                <button
                                    type="button"
                                    className={`btn start ${stop ? 'stop' : ''}`}
                                    onClick={() => setOpen(true)}
                                >
                                    <div className="btn-label">
                                        <span className="label">차량운행</span>
                                        <div className={`status-eng ${stop ? 'stop' : ''}`}>
                                            <div className="img-wrapper">
                                                <div className="img">
                                                    <img
                                                        src={IconStop}
                                                        alt="stop"
                                                        className="stop"
                                                    />
                                                </div>
                                                <div className="img">
                                                    <img
                                                        src={IconStart}
                                                        alt="start"
                                                        className="start"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="status-kor">{stop ? '정지' : '시작'}</div>
                                    </div>
                                    <span className="btn-bg"></span>
                                </button>
                            </div>
                        </li>
                    )}
                </ListWrapper>
                <CSSTransition in={open} classNames="modal" timeout={500} unmountOnExit>
                    <Modal handleConfirm={handleConfirm} stop={stop} setOpen={setOpen} />
                </CSSTransition>
            </div>
        </ListPage>
    );
}
