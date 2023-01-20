import React from 'react';

export default function RefreshButton() {
    const handleRefrest = () => {
        //navigate(0) //ios not work
        document.location.reload();
    };

    return (
        <button type="button" className="control-btn refresh" onClick={handleRefrest}>
            <i className="ri-refresh-line icon"></i>
        </button>
    );
}
