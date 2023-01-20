import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import axios from '../../../lib/axios';
import ItemEvent from './ItemEvent';
import ShareModal from './ItemShareModal';
import SummarySheet from './SummarySheet';

export default function ItemDetail() {
    const { mapState } = useMap();
    const { selectItem } = mapState;

    const [isDetail, setIsDetail] = useState(false);
    const [eventModal, isEventModal] = useState(false);
    const [shareModal, isShareModal] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(selectItem ? true : false);
        setIsDetail(false);
    }, [selectItem]);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);

            try {
                const { data } = await axios.get(
                    `/api/detail?id=${selectItem.unitid}&name=${selectItem.unit_nm}`
                );
                setData(data);
                setIsLoading(false);
            } catch (err) {
                alert(err);
                console.error(err);
                setIsLoading(false);
            }
        };

        if (selectItem) {
            fetch();
        }
    }, [selectItem]);

    return (
        <>
            <CSSTransition in={isOpen} classNames="sheet" timeout={500} unmountOnExit>
                <div className="summary-panel detail-panel">
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
