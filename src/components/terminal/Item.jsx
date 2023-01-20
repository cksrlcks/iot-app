import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMarkerType } from '../../lib/mapHelper';

export default function NoticeItem({ item }) {
    const navigate = useNavigate();
    const getTerminalType = (string) => {
        return string.split('(')[1].split(')')[0];
    };

    const getMatter = (number) => {
        const status = {
            1: '운행가능',
            2: '차량고장',
            3: '점검',
            4: '미운행',
        };

        return status[Number(number) || '-'];
    };

    return (
        <li className="item terminal" onClick={() => navigate(`./${item.unitid}`)}>
            <div className="terminal-card">
                <div className={`terminal-icon ${getMarkerType(item.iconnum)}`}></div>
                <div className="terminal-info">
                    <div className="name"> {item.unit_nm}</div>
                    <div className="phone">
                        {item.unitid1}({getTerminalType(item.prod_nm)})
                    </div>
                </div>
                <div className={`terminal-matter matter-${item.matter}`}>
                    {getMatter(item.matter)}
                </div>
            </div>
        </li>
    );
}
