import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMap } from '../../../context/MapContext';
import axios from '../../../lib/axios';
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

    const handleShowPath = async () => {
        const itemId = selectItem.unitid;
        sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));

        try {
            const { data } = await axios.get(
                `/api/pathCoords?id=${itemId}${logMode ? '&test="small"' : ''}`
            );
            mapDispatch({ type: 'SET_PATH_DATA', payload: data });
        } catch (err) {
            console.log(err);
        }
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
