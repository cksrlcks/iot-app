import React from 'react';
import { useNavigate } from 'react-router-dom';
import ControlImg from '../../assets/img/home/icon-quick-control.png';
import TerminalImg from '../../assets/img/home/icon-quick-terminal.png';

export default function Quick() {
    const navigate = useNavigate();
    return (
        <ul className="quick-list">
            <li>
                <div className="quick-btn control" onClick={() => navigate('/control')}>
                    <img src={ControlImg} alt="위치관제 바로가기" />
                    <div className="label">
                        <div className="label-title">위치관제</div>
                        <div className="label-eng">GPS Tracking</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </li>
            <li>
                <div className="quick-btn terminal" onClick={() => navigate('/menu/terminal')}>
                    <img src={TerminalImg} alt="단말목록 바로가기" />
                    <div className="label">
                        <div className="label-title">단말목록</div>
                        <div className="label-eng">Device List</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </li>
        </ul>
    );
}
