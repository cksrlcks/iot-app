import React, { useEffect, useState, useRef } from 'react';
import { useMap } from '../../../context/MapContext';
import HistoryItem from './Item';
import LoadingIcon from '../../../assets/img/common/icon-loading.svg';
import useInfinite from './../../../hook/useInfinite';

export default function ItemHistory({ drawer, handleShowPath }) {
    const { mapState, mapDispatch } = useMap();
    const { selectItem, selectPathItem, pathMode, logMode } = mapState;

    useEffect(() => {
        drawer?.present({ animate: true });

        return () => {
            drawer?.destroy({ animate: true });
        };
    }, [drawer]);

    useEffect(() => {
        if (drawer) {
            drawer.on('onTransitionEnd', () => {
                if (drawer.currentBreak() === 'bottom') {
                    drawer.moveToBreak('middle');
                }
            });
        }
    }, [drawer]);

    useEffect(() => {
        if (selectPathItem) {
            drawer?.hide();
        } else {
            if (pathMode) {
                drawer?.moveToBreak('middle');
            }
        }
    }, [selectPathItem, pathMode, drawer]);

    const {
        data: itemHistory,
        hasNextPage,
        isLoading,
        ref,
    } = useInfinite('/api/pathDetail', 12, selectItem.unitid, logMode);

    return (
        <>
            <div className="sheet-content history-wrapper">
                <ul className="history-list">
                    {itemHistory.map((item) => (
                        <HistoryItem key={item.idx} item={item} handleShowPath={handleShowPath} />
                    ))}
                </ul>
                {isLoading && (
                    <div className="load-more">
                        <img src={LoadingIcon} alt="loading" />
                    </div>
                )}
                {!isLoading && (
                    <div ref={ref} className="load-more">
                        {!hasNextPage && '모두 불러왔습니다.'}
                    </div>
                )}
            </div>
        </>
    );
}
