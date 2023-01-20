import React from 'react';

export default function Button({ type = 'button', color = 'purple', label = 'button', onClick }) {
    return (
        <button type={type} onClick={onClick} className={`common-btn ${color}`}>
            <span>{label}</span>
        </button>
    );
}
