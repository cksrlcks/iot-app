import React from 'react';
import InfoTitle from './../../common/InfoTitle';

export default function Header({ data, setIsFilterOpen, handleReset, keyword, handleSearch }) {
    return (
        <>
            <div className="sheet-header">
                <InfoTitle label="전체목록" detail={data?.length ? data.length : '-'}></InfoTitle>
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
        </>
    );
}
