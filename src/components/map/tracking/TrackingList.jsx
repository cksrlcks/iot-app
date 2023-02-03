import React from 'react';
import TrackingListItem from './TrackingListItem';

export default function TrackList({ renderList }) {
    return (
        <>
            <div className="sheet-content track-list-wrapper">
                <div className="sheet-body">
                    <ul className="track-list">
                        {renderList?.map((item) => {
                            return <TrackingListItem key={item.unitid} item={item} />;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
