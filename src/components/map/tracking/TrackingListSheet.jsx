import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import { sortJSON } from '../../../lib/sort';
import TrackList from './TrackingList';
import FilterModal from './FilterModal';
import Header from './Header';

export default function TrackingList() {
    const { mapState, mapDispatch } = useMap();
    const { isMapClicked, trackingList: data } = mapState;

    //sheet
    const [open, setOpen] = useState(true);
    const sheetRef = useRef();
    const [fullBtnShow, setFullBtnShow] = useState(true);

    const [filteredData, setFilteredData] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [keyword, setKeyword] = useState('');

    const renderList = filteredData ? filteredData : data;
    const iosBottomPadding = +getComputedStyle(document.documentElement)
        .getPropertyValue('--sab')
        .replace('px', '');

    //검색바 onchange
    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };

    //검색바 reset버튼
    const handleReset = (e) => {
        setKeyword('');
    };

    const handleOpen = () => {
        setFullBtnShow(false);
        setTimeout(function () {
            sheetRef.current.snapTo(({ maxHeight }) => maxHeight);
        }, 100);
    };

    useEffect(() => {
        sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));
    }, [isMapClicked]);

    //정렬버튼 클릭시
    const handleFilter = (key, type) => {
        setIsFilterOpen((prev) => !prev);
        const sortedData = sortJSON(renderList, key, type);
        setFilteredData(sortedData);
    };

    //검색어 변경시
    useEffect(() => {
        if (keyword) {
            setFilteredData(data.filter((item) => String(item.unit_nm).includes(keyword)));
        } else {
            setFilteredData(null);
        }
    }, [keyword, data]);

    return (
        <>
            <button
                type="button"
                className={`full-btn ${fullBtnShow ? '' : 'hide'}`}
                onClick={handleOpen}
            >
                목록보기
            </button>
            <BottomSheet
                className="bottom-sheet"
                open={open}
                ref={sheetRef}
                skipInitialTransition={true}
                defaultSnap={({ snapPoints }) => Math.min(...snapPoints)}
                snapPoints={({ maxHeight }) => [
                    maxHeight - maxHeight / 10,
                    maxHeight / 4,
                    94 + iosBottomPadding,
                ]}
                blocking={false}
                expandOnContentDrag={true}
                onSpringEnd={() => {
                    requestAnimationFrame(() => {
                        if (sheetRef.current?.height < 100 + iosBottomPadding) {
                            return setFullBtnShow(true);
                        } else {
                            return setFullBtnShow(false);
                        }
                    });
                }}
                header={
                    <Header
                        data={data}
                        setIsFilterOpen={setIsFilterOpen}
                        handleReset={handleReset}
                        keyword={keyword}
                        handleSearch={handleSearch}
                    />
                }
            >
                <TrackList renderList={renderList} />
            </BottomSheet>
            <CSSTransition in={isFilterOpen} classNames="modal" timeout={200} unmountOnExit>
                <FilterModal handleFilter={handleFilter} setIsFilterOpen={setIsFilterOpen} />
            </CSSTransition>
        </>
    );
}
