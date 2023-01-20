import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListPage from '../layout/ListPage';
import Button from '../button/Button';
import { getMarkerType } from '../../lib/mapHelper';
import CustomCheck from '../common/CustomCheck';

export default function View({ data }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        matter: '',
        icon: '',
    });

    useEffect(() => {
        if (data) {
            setFormData((prev) => ({ ...prev, matter: data.matter, icon: data.iconnum }));
        }
    }, [data]);

    const matterGroup = [
        [1, '정상'],
        [2, '차량고장'],
        [3, '점검'],
        [4, '미운행'],
    ];
    const iconGroup = [
        ['car', '승용차'],
        ['motorcycle', '오토바이'],
        ['human', '사람'],
        ['bike', '자전거'],
        ['truck', '물류차량'],
        ['trash', '폐기물차량'],
        ['school', '통학버스'],
        ['airplane', '항공'],
        ['ship', '선박'],
        ['crane', '굴삭기'],
        ['pet', '반려동물'],
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('보냅니다 데이터');
        console.log(formData);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <ListPage title="단말목록" mode="view">
            <div className="app-inner">
                {data && (
                    <div className="common-view-wrapper">
                        <div className="terminal-name-badge">
                            <div className="badge">단말기명</div>
                            <div className="name">{data.unit_nm}</div>
                        </div>
                        <div className="info-group">
                            <div className="row">
                                <div className="row-label">등록일</div>
                                <div className="row-content">{data.makedate}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">단말번호</div>
                                <div className="row-content">{data.unitid1}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">S/N번호</div>
                                <div className="row-content">{data.unit_sn}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">총 주행거리</div>
                                <div className="row-content">{data.total_accumuldist} km</div>
                            </div>
                        </div>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="row-label">특이</div>
                                <div className="row-content">
                                    <div className="check-group col-4">
                                        {matterGroup.map((item) => (
                                            <CustomCheck
                                                type="radio"
                                                value={item[0]}
                                                name="matter"
                                                label={item[1]}
                                                key={item[0]}
                                                defaultChecked={data.matter === item[0]}
                                                onChange={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        matter: item[0],
                                                    }))
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="row-label">아이콘</div>
                                <div className="row-content">
                                    <div className="check-group col-icon">
                                        {iconGroup.map((item) => {
                                            const iconName = getMarkerType(data.iconnum);
                                            const defaultChecked =
                                                iconName.indexOf(item[0]) !== -1 ? true : false;

                                            return (
                                                <CustomCheck
                                                    type="radio"
                                                    value={item[0]}
                                                    name="icon"
                                                    label={item[1]}
                                                    key={item[0]}
                                                    icon
                                                    defaultChecked={defaultChecked}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            icon: item[0],
                                                        }))
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="float-btn-wrapper flex">
                                <Button label="취소" color="white" onClick={handleBack} />
                                <Button label="저장" color="black" type="submit" />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </ListPage>
    );
}
