import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMap } from '../../../context/MapContext';
import useFetch from './../../../hook/useFetch';
import Button from '../../button/Button';
import Header from './Header';
import ItemHistory from './ItemHistory';
import PathDetail from './PathDetail';

export default function ItemHistorySheet() {
    const { mapState, mapDispatch } = useMap();
    const { selectItem, logMode, pathMode, selectPathItem } = mapState;

    const [open, setOpen] = useState(false);
    const sheetRef = useRef();

    useEffect(() => {
        setOpen(true);
    }, []);

    const [fetchPath, setFetchPath] = useState(false);
    const fetchUrl = fetchPath
        ? `/api/pathCoords?id=${selectItem.unitid}${logMode ? '&test="small"' : ''}`
        : null;
    const { data } = useFetch(fetchUrl);
    useEffect(() => {
        if (data) {
            mapDispatch({ type: 'SET_PATH_DATA', payload: data });
            setFetchPath(false);
        }
    }, [data, mapDispatch]);

    const handleShowPath = async () => {
        sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));
        setFetchPath(true);
    };

    return (
        <>
            {!selectPathItem && (
                <BottomSheet
                    className="bottom-sheet"
                    open={open}
                    ref={sheetRef}
                    skipInitialTransition={true}
                    defaultSnap={() => 350}
                    snapPoints={({ maxHeight }) => [maxHeight - 100, maxHeight / 2, 350]}
                    blocking={false}
                    expandOnContentDrag={true}
                    header={<Header />}
                >
                    <ItemHistory handleShowPath={handleShowPath} />
                    {!pathMode && (
                        <div className="float-btn-wrapper">
                            <Button label="경로보기" color="black" onClick={handleShowPath} />
                        </div>
                    )}
                </BottomSheet>
            )}
            {selectPathItem && <PathDetail />}
        </>
    );
}
