import React from 'react';
import { getMarkerType, getTerminalType } from '../../lib/mapHelper';

export default function LinkItem({ item }) {
    console.log(item);
    const getTerminalType = (string) => {
        return string.split('(')[1].split(')')[0];
    };

    const handleChange = (e) => {
        if (e.target.checked) {
            alert('연결되었습니다.');
        } else {
            alert('해제되었습니다.');
        }
    };

    return (
        <li className="item terminal">
            <div className="terminal-card">
                <div className={`terminal-icon ${getMarkerType(item.iconnum)}`}></div>
                <div className="terminal-info">
                    <div className="name"> {item.unit_nm}</div>
                    <div className="phone">
                        {item.unitid1}({getTerminalType(item.prod_nm)})
                    </div>
                </div>
                <ToggleBtn defaultCheck={item.active === 1} handleChange={handleChange} />
            </div>
        </li>
    );
}

function ToggleBtn({ defaultCheck, handleChange }) {
    return (
        <label className="toggle-btn">
            <input
                type="checkbox"
                className="hidden"
                defaultChecked={defaultCheck}
                onChange={handleChange}
            />
            <div className="btn"></div>
        </label>
    );
}
