import React from 'react';

export default function InfoTitle({ label, detail }) {
    return (
        <div className="info-title">
            <div className="info-label">{label}</div>
            <div className="info-detail">{detail ? detail : '-'}</div>
        </div>
    );
}
