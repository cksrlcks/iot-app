import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import useFetch from '../../../hook/useFetch';
import ItemEvent from './ItemEvent';
import ShareModal from './ItemShareModal';
import SummarySheet from './SummarySheet';

export default function ItemDetail() {
    const { mapState } = useMap();
    const { selectItem } = mapState;

    const [data, setData] = useState(null);
    const [isDetail, setIsDetail] = useState(false);
    const [eventModal, isEventModal] = useState(false);
    const [shareModal, isShareModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(selectItem ? true : false);
        setIsDetail(false);
    }, [selectItem]);

    const fetchUrl = selectItem
        ? `/api/detail?id=${selectItem.unitid}&name=${selectItem.unit_nm}`
        : null;
    const { data: resonseData, isLoading, error } = useFetch(fetchUrl);

    useEffect(() => {
        if (resonseData) {
            setData(resonseData);
        }
    }, [resonseData]);

    return (
        <>
            <CSSTransition in={isOpen} classNames="sheet" timeout={500} unmountOnExit>
                <div className="summary-panel detail-panel">
                    <div className={`${isDetail ? 'on' : ''} `}>
                        {selectItem && (
                            <SummarySheet
                                item={data}
                                isLoading={isLoading}
                                error={error}
                                isDetail={isDetail}
                                setIsDetail={setIsDetail}
                                isEventModal={isEventModal}
                                isShareModal={isShareModal}
                            />
                        )}
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition in={eventModal} classNames="modal" timeout={500} unmountOnExit>
                <ItemEvent item={data} isEventModal={isEventModal} />
            </CSSTransition>
            <CSSTransition in={shareModal} classNames="modal" timeout={500} unmountOnExit>
                <ShareModal item={data} isShareModal={isShareModal} />
            </CSSTransition>
        </>
    );
}
