import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { isIOS } from 'react-device-detect';
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
    const bottomHeight = isIOS
        ? +getComputedStyle(document.documentElement).getPropertyValue('--sab').replace('px', '') +
          94
        : 94;
    const { mapState, mapDispatch } = useMap();
    const { selectItem, logMode, pathMode, selectPathItem } = mapState;

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: formatDate(new Date()),
        time: {
            from: 5,
            to: 7,
        },
    });

    useEffect(() => {
        console.log(`${formData.date} 날짜의`);
        console.log(`${formData.time.from}시 ~ ${formData.time.to}시의 데이터를 가져옵니다.`);
    }, [formData]);

    const handleDate = (date) => {
        setFormData((prev) => ({ ...prev, date }));
    };

    const handleTime = (time) => {
        setFormData((prev) => ({ ...prev, time }));
    };

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
            setTimeout(function () {
                sheetRef.current?.snapTo(({ snapPoints }) => {
                    return snapPoints[3];
                });
            }, 200);
        }
    }, [data, mapDispatch]);

    useEffect(() => {
        //패스모드가 풀릴때 다시 올라오기
        if (!pathMode) {
            sheetRef.current?.snapTo(({ snapPoints }) => snapPoints[1]);
        }
    }, [pathMode]);

    const handleShowPath = () => {
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
                    snapPoints={({ maxHeight }) => [
                        maxHeight - 100,
                        maxHeight / 2,
                        350,
                        bottomHeight,
                    ]}
                    blocking={false}
                    expandOnContentDrag={true}
                    header={
                        <Header
                            date={formData.date}
                            setDate={handleDate}
                            time={formData.time}
                            setTime={handleTime}
                            setIsDatePickerOpen={setIsDatePickerOpen}
                            setIsTimePickerOpen={setIsTimePickerOpen}
                        />
                    }
                    footer={
                        !pathMode && (
                            <Button label="경로보기" color="black" onClick={handleShowPath} />
                        )
                    }
                >
                    <ItemHistory handleShowPath={handleShowPath} />
                </BottomSheet>
            )}
            {selectPathItem && <PathDetail />}

            {/* bottom sheet 의 header에서 react portal로 위치옮겨도 event bubbling때문에 뒷스크롤 제어 안됨, 따로 옮김 */}
            {isDatePickerOpen && (
                <DatePickerModal
                    date={formData.date}
                    setDate={handleDate}
                    isDatePickerOpen={isDatePickerOpen}
                    setIsDatePickerOpen={setIsDatePickerOpen}
                />
            )}
            {isTimePickerOpen && (
                <TimePickerModal
                    time={formData.time}
                    setTime={handleTime}
                    isTimePickerOpen={isTimePickerOpen}
                    setIsTimePickerOpen={setIsTimePickerOpen}
                />
            )}
        </>
    );
}
