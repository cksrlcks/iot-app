import React from 'react';
import { useNavigate } from 'react-router-dom';
import TypeBadge from './TypeBadge';

export default function SettingItem({ item }) {
    const navigate = useNavigate();
    const getEventTxt = (key) => {
        const text = {
            1: '제한속도 보고',
            2: '긴급보고',
            3: '지역진입보고',
            4: '지역이탈보고',
            5: '주전원 off-12V',
            6: '내장배터리 저전압',
            7: '차량배터리 저전압',
            8: '차량 문 열림',
            9: '차량 문 닫힘',
        };
        return text[key] || null;
    };
    return (
        <li className="item message" onClick={() => navigate(`./${item.userId}`)}>
            <div className="item-body">
                <div className="message-top">
                    <div className="info">
                        <TypeBadge type={item.info.method} />
                        <div className="name">{item.userName}</div>
                    </div>
                    <div className="summary">
                        <div className="label">이벤트</div>
                        <div className="count">{item.eventCode.length}개</div>
                    </div>
                </div>
                <div className="message-list">
                    {item.eventCode.map((code) => (
                        <span key={code} className="message-item">
                            {getEventTxt(code)}
                        </span>
                    ))}
                </div>
            </div>
            <div className="item-footer">
                <div className="unit">
                    <span className="unit-label">등록</span>
                    <span className="unit-content">{item.register}</span>
                </div>
                <div className="unit">
                    <div className="unit-content">{item.makeDate}</div>
                </div>
            </div>
        </li>
    );
}
