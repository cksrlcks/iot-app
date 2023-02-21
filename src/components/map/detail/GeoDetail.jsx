import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import useFetch from '../../../hook/useFetch';
import ItemEvent from './ItemEvent';
import ShareModal from './ItemShareModal';
import SummarySheet from './SummarySheet';

export default function GeoDetail({ item }) {
    const { mapState, mapDispatch } = useMap();
    const { selectGeoItem } = mapState;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(selectGeoItem ? true : false);
    }, [selectGeoItem]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            mapDispatch({ type: 'BLUR' });
        }, 500);
    };

    return (
        <>
            <CSSTransition in={isOpen} classNames="sheet" timeout={5000} unmountOnExit>
                <div className="summary-panel detail-panel geo-panel">
                    <div>
                        {selectGeoItem && (
                            <>
                                <div className="summary-header">
                                    <div className="item-info-wrapper">
                                        <div className="item-info">
                                            <div className="marker geo">
                                                <span className="icon">
                                                    <i className="ri-community-fill"></i>
                                                </span>
                                            </div>
                                            <span className="name">{item.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            class="close-btn"
                                            onClick={handleClose}
                                        >
                                            <i class="ri-close-fill icon"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="summary-body">
                                    <div className="info-group">
                                        <div className="row">
                                            <div className="row-label">지역명</div>
                                            <div className="row-content">{item.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="row-label">반경</div>
                                            <div className="row-content">{item.radius}M</div>
                                        </div>
                                        <div className="row">
                                            <div className="row-label">진입/이탈</div>
                                            <div className="row-content">{item.status}</div>
                                        </div>
                                        <div className="row">
                                            <div className="row-label">도로명</div>
                                            <div className="row-content">{item.addr_road}</div>
                                        </div>
                                        <div className="row">
                                            <div className="row-label">지번</div>
                                            <div className="row-content">{item.addr_jibun}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}
