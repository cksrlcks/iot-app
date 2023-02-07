import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RefreshButton() {
    const navigate = useNavigate;
    const handleRefrest = () => {
        //navigate(0); //ios not work
        window.history.replaceState({}, document.title);
        document.location.reload();
    };

    return (
        <button type="button" className="control-btn refresh" onClick={handleRefrest}>
            <i className="ri-refresh-line icon"></i>
        </button>
    );
}
