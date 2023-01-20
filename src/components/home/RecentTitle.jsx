import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function RecentTitle({ title, desc, onClick }) {
    const navigate = useNavigate();
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
