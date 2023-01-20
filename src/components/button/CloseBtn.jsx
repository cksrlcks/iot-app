import React from 'react';

export default function CloseBtn({ onClick }) {
    return (
        <button type="button" className="close-btn" onClick={onClick}>
            <i className="ri-close-fill icon"></i>
        </button>
    );
}
