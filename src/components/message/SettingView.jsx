import React, { useState, useEffect } from 'react';
import TypeBadge from './TypeBadge';
import Button from './../button/Button';
import { useNavigate } from 'react-router-dom';
import CustomCheck from './../common/CustomCheck';

export default function SettingView({ data }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        eventCode: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        },
        register: '',
        makeDate: '',
        info: {
            method: '',
            from: '',
            to: '',
        },
    });
    useEffect(() => {
        if (data) {
            setFormData((prev) => {
                const newCode = { ...prev.eventCode };
                data.eventCode.forEach((item) => {
                    newCode[item] = true;
                });

                return {
                    ...prev,
                    userId: data.userId,
                    userName: data.userName,
                    register: data.register,
                    makeDate: data.makeDate,
                    info: data.info,
                    eventCode: newCode,
                };
            });
        }
    }, [data]);

    const getEventName = (key) => {
        const name = {
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
        return name[key] || null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('보냅니다. 데이터.');
        console.log(formData);
    };
    const handleDelete = () => {
        navigate(-1);
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className="app-inner">
            {data && (
                <div className="common-view-wrapper message-view">
                    <div className="info-group">
                        <div className="row block">
                            <div className="row-label">유의사항</div>
                            <div className="row-content">
                                <div className="message-info">
                                    <div className="row">
                                        <TypeBadge type="push" />
                                        <div className="content">
                                            수신자가 어플리케이션 설치 및 1번 이상 로그인
                                        </div>
                                    </div>
                                    <div className="row">
                                        <TypeBadge type="sms" />
                                        <div className="content">등록자의 SMS개수에서 차감</div>
                                    </div>
                                </div>
                                <div className="message-alert">
                                    <i className="ri-error-warning-fill icon"></i>별도의 SMS의
                                    비용이 발생합니다. 문의 1599-2737
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="info-group">
                        <div className="row">
                            <div className="row-label">수신방법 설정</div>
                            <div className="row-content">
                                <TypeBadge type={data.info.method} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-label">수신자</div>
                            <div className="row-content">
                                <div className="message-path">
                                    <span className="from">{data.info.from}</span>
                                    <i className="ri-arrow-right-circle-fill icon"></i>
                                    <span className="to">{data.info.to}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="row-label">이벤트</div>
                            <div className="row-content">
                                <div className="check-group col-message narrow">
                                    {Object.entries(formData.eventCode).map((item) => {
                                        return (
                                            <CustomCheck
                                                type="checkbox"
                                                checked={item[1]}
                                                defaultChecked={true}
                                                label={getEventName(item[0])}
                                                key={item[0]}
                                                onChange={(e) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        eventCode: {
                                                            ...prev.eventCode,
                                                            [item[0]]: e.target.checked,
                                                        },
                                                    }));
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="float-btn-wrapper flex">
                            <Button label="취소" color="white" onClick={handleBack} />
                            <Button label="삭제" color="white" onClick={handleDelete} />
                            <Button label="저장" color="black" type="submit" />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
