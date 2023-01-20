import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMap } from '../../../context/MapContext';
import { sortJSON } from '../../../lib/sort';
import TrackingListItem from './TrackingListItem';
import InfoTitle from '../../common/InfoTitle';
import FilterModal from './FilterModal';

export default function TrackList({ drawer }) {
    const { mapState, mapDispatch } = useMap();
    const { trackingList: data } = mapState;

    const [filteredData, setFilteredData] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const renderList = filteredData ? filteredData : data;

    //정렬버튼 클릭시
    const handleFilter = (key, type) => {
        setIsFilterOpen((prev) => !prev);
        const sortedData = sortJSON(data, key, type);
        setFilteredData(sortedData);
    };

    //검색바 onchange
    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };

    //검색바 reset버튼
    const handleReset = (e) => {
        setKeyword('');
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
            <div className="sheet-content track-list-wrapper">
                <div className="sheet-header">
                    <InfoTitle
                        label="전체목록"
                        detail={data?.length ? data.length : '-'}
                    ></InfoTitle>
                    <div className="sheet-control">
                        <button
                            type="button"
                            className="filter-btn"
                            onClick={() => setIsFilterOpen(true)}
                        >
                            <i className="ri-sound-module-fill icon"></i>
                            <span>정렬</span>
                        </button>
                    </div>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        className="keyboard"
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={handleSearch}
                    />
                    {keyword && (
                        <i className="ri-close-circle-fill reset-btn" onClick={handleReset}>
                            <span className="a11y">초기화</span>
                        </i>
                    )}
                </div>
                <div className="sheet-body">
                    <ul className="track-list">
                        {renderList?.map((item) => {
                            return <TrackingListItem key={item.unitid} item={item} />;
                        })}
                    </ul>
                </div>
            </div>
            <CSSTransition in={isFilterOpen} classNames="modal" timeout={200} unmountOnExit>
                <FilterModal handleFilter={handleFilter} />
            </CSSTransition>
        </>
    );
}
