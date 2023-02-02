import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeItem({ item, deleteItem }) {
    const navigate = useNavigate();
    const handleLink = (e) => {
        e.stopPropagation();
        navigate(`./link/${item.id}`);
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        const confirm = window.confirm('삭제하시겠습니까?');
        if (confirm) {
            deleteItem(item);
        }
    };
    return (
        <li className="item region" onClick={() => navigate(`./${item.id}`)}>
            <div className="item-body">
                <div className="info-group">
                    <div className="row">
                        <div className="row-label">지역명</div>
                        <div className="row-content">{item.region_name}</div>
                    </div>
                    <div className="row">
                        <div className="row-label">주소</div>
                        <div className="row-content">{item.region_addr_road}</div>
                    </div>
                </div>
            </div>
            <div className="item-footer">
                <div className="unit" onClick={handleDelete}>
                    <span className="unit-content">
                        <div className="delete-btn">삭제</div>
                    </span>
                </div>
                <div className="unit">
                    <div className="unit-label" onClick={handleLink}>
                        <div className="link-btn">
                            <i className="ri-link icon"></i>단말기 연결
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
