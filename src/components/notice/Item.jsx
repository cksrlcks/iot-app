import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeItem({ item }) {
    const navigate = useNavigate();
    return (
        <li className="item notice" onClick={() => navigate(`./${item.id}`)}>
            <div className="item-body">
                <div className="item-title">
                    {item.urgent && <span className="badge">긴급</span>}
                    <div className="title line-1">{item.title}</div>
                </div>
            </div>
            <div className="item-footer">
                <div className="unit">
                    <span className="unit-label">작성</span>
                    <span className="unit-content">{item.writer}</span>
                </div>
                <div className="unit">
                    <div className="unit-content">{item.date}</div>
                </div>
            </div>
        </li>
    );
}
