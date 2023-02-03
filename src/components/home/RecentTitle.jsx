import React from 'react';

export default function RecentTitle({ title, desc, onClick }) {
    return (
        <div className="recent-title">
            <div className="title">{title}</div>
            {desc && <div className="desc">{desc}</div>}
            <button type="button" className="more" onClick={onClick}>
                <i className="ri-add-box-fill icon"></i>
            </button>
        </div>
    );
}
