import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMap } from '../../../context/MapContext';
import useFetch from './../../../hook/useFetch';
import Button from '../../button/Button';
import Header from './Header';
import ItemHistory from './ItemHistory';
import PathDetail from './PathDetail';
import DatePickerModal from './DatePickerModal';
import { formatDate } from '../../../lib/date';
import TimePickerModal from './TimePickerModal';

export default function ItemHistorySheet() {
    const { mapState, mapDispatch } = useMap();
    const { selectItem, logMode, pathMode, selectPathItem } = mapState;

    const [open, setOpen] = useState(false);
    const sheetRef = useRef();
    useEffect(() => {
        setOpen(true);
    }, []);

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [date, setDate] = useState(formatDate(new Date()));
    const [time, setTime] = useState({
        from: 5,
        to: 7,
    });

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
                    header={
                        <Header
                            date={date}
                            setDate={setDate}
                            time={time}
                            setTime={setTime}
                            setIsDatePickerOpen={setIsDatePickerOpen}
                            setIsTimePickerOpen={setIsTimePickerOpen}
                        />
                    }
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

            {/* bottom sheet 의 header에서 react portal로 위치옮겨도 event bubbling때문에 뒷스크롤 제어 안됨, 따로 옮김 */}
            {isDatePickerOpen && (
                <DatePickerModal
                    date={date}
                    setDate={setDate}
                    isDatePickerOpen={isDatePickerOpen}
                    setIsDatePickerOpen={setIsDatePickerOpen}
                />
            )}
            {isTimePickerOpen && (
                <TimePickerModal
                    time={time}
                    setTime={setTime}
                    isTimePickerOpen={isTimePickerOpen}
                    setIsTimePickerOpen={setIsTimePickerOpen}
                />
            )}
        </>
    );
}
