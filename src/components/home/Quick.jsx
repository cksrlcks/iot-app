import React from 'react';
import { useNavigate } from 'react-router-dom';
import ControlImg from '../../assets/img/home/icon-quick-control.png';
import TerminalImg from '../../assets/img/home/icon-quick-terminal.png';
import LogImg from '../../assets/img/home/icon-quick-log.png';
import RegionImg from '../../assets/img/home/icon-quick-region.png';
import PushImg from '../../assets/img/home/icon-quick-sms.png';
import SettingImg from '../../assets/img/home/icon-quick-setting.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Quick() {
    const navigate = useNavigate();
    return (
        <Swiper spaceBetween={4} slidesPerView={2} className="quick-list">
            <SwiperSlide>
                <div className="quick-btn control" onClick={() => navigate('/control')}>
                    <img src={ControlImg} alt="위치관제 바로가기" />
                    <div className="label">
                        <div className="label-title">위치관제</div>
                        <div className="label-eng">GPS Tracking</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="quick-btn terminal" onClick={() => navigate('/menu/terminal')}>
                    <img src={TerminalImg} alt="단말목록 바로가기" />
                    <div className="label">
                        <div className="label-title">단말목록</div>
                        <div className="label-eng">Device List</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="quick-btn region" onClick={() => navigate('/menu/region')}>
                    <img src={RegionImg} alt="지역 진입 · 이탈" />
                    <div className="label">
                        <div className="label-title">지역 진입 · 이탈</div>
                        <div className="label-eng">Fencing</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="quick-btn log" onClick={() => navigate('/menu/log')}>
                    <img src={LogImg} alt="운행일지 바로가기" />
                    <div className="label">
                        <div className="label-title">운행일지</div>
                        <div className="label-eng">Locatino Log</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="quick-btn push" onClick={() => navigate('/menu/message/list')}>
                    <img src={PushImg} alt="PUSH · SMS" />
                    <div className="label">
                        <div className="label-title">PUSH · SMS</div>
                        <div className="label-eng">PUSH · SMS</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="quick-btn setting" onClick={() => navigate('/menu/setting')}>
                    <img src={SettingImg} alt="개인설정" />
                    <div className="label">
                        <div className="label-title">개인설정</div>
                        <div className="label-eng">Setting</div>
                        <span className="arrow"></span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
