import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMap } from '../../context/RegionContext';
import Button from './../../components/button/Button';
import CustomRange from '../../components/common/Range';
import Map from './Map';
import Marker from './Marker';
import Circle from './Circle';
import DaumPostBtn from './DaumPostBtn';
import CustomRadio from '../common/CustomRadio';

export default function View({ data }) {
    const navigate = useNavigate();
    const { naver } = window;
    const { mapState, mapDispatch } = useMap();
    const { coords, addr, circle } = mapState;

    const [open, setOpen] = useState(true);
    const regionSetting = ['설정해제', '진입', '이탈', '진입/이탈'];
    const sheetRef = useRef(null);
    const [formData, setFormData] = useState({
        region_name: '',
        region_radius: 500,
        region_addr_road: '',
        region_addr_jibun: '',
        geo_priority: '',
        latitude: '',
        longitude: '',
        method: 'push',
        setting: '설정해제',
    });
    const {
        region_name,
        region_radius,
        region_addr_road,
        region_addr_jibun,
        geo_priority,
        latitude,
        longitude,
        setting,
    } = formData;

    useEffect(() => {
        if (data) {
            setFormData((prev) => ({ ...prev, ...data }));
            if (data.latitude && data.longitude) {
                mapDispatch({
                    type: 'SET_COORDS',
                    payload: { y: data.latitude, x: data.longitude },
                });
            }
        }
    }, [data, mapDispatch]);

    useEffect(() => {
        if (addr) {
            setFormData((prev) => ({
                ...prev,
                region_addr_road: addr.roadAddress,
                region_addr_jibun: addr.jibunAddress,
            }));
        }
    }, [addr]);

    useEffect(() => {
        if (coords) {
            setFormData((prev) => ({
                ...prev,
                latitude: coords.y,
                longitude: coords.x,
            }));
        }
    }, [coords]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const onChangeFormData = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <DaumPostBtn setFormData={setFormData} />
            <Map radius={formData.region_radius}>
                {coords && (
                    <>
                        <Marker />
                        <Circle radius={formData.region_radius} />
                    </>
                )}
            </Map>
            <BottomSheet
                className="bottom-sheet"
                open={open}
                ref={sheetRef}
                skipInitialTransition={true}
                defaultSnap={() => 350}
                snapPoints={({ maxHeight }) => [maxHeight - 100, maxHeight / 2, 350]}
                blocking={false}
                expandOnContentDrag={true}
            >
                <div className="sheet-content">
                    <form onSubmit={handleSubmit} className="region-wrapper">
                        <div className="form-row">
                            <div className="row-label">선택된 위치정보</div>
                            <div className="row-content">
                                <div className="addr-field">
                                    <div className="addr-title">
                                        {region_addr_jibun
                                            ? region_addr_jibun
                                            : '주소를 검색하거나 마커를 찍어주세요'}
                                    </div>
                                    <div className="addr-info">
                                        <div className="info-item">
                                            <div className="item-label">도로</div>
                                            <div className="item-content">
                                                {region_addr_road ? region_addr_road : '-'}
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="item-label">좌표</div>
                                            <div className="item-content">
                                                {latitude ? latitude : '-'} °N{' '}
                                                {longitude ? longitude : '-'} °E
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-row">
                            <div className="row-label">지역명</div>
                            <div className="row-content">
                                <div className="form-input">
                                    <input
                                        type="text"
                                        placeholder="지역명을 입력해주세요"
                                        value={region_name}
                                        name="region_name"
                                        onChange={(e) =>
                                            onChangeFormData('region_name', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-label">진입/이탈</div>
                            <div className="row-content">
                                <div className="check-group col-4">
                                    {regionSetting.map((item) => (
                                        <CustomRadio
                                            value={item}
                                            name="setting"
                                            label={item}
                                            key={item}
                                            checked={setting === item}
                                            onChange={(e) =>
                                                onChangeFormData('setting', e.target.value)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-label">반경</div>
                            <div className="row-content">
                                <CustomRange
                                    name="region_radius"
                                    defaultValue={region_radius}
                                    min={0}
                                    max={2000}
                                    step={500}
                                    onChangeFormData={onChangeFormData}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="row-label">우선순위</div>
                            <div className="row-content">
                                <div className="form-input">
                                    <input
                                        type="text"
                                        placeholder="우선순위를 입력해주세요"
                                        value={geo_priority}
                                        name="geo_priority"
                                        onChange={(e) =>
                                            onChangeFormData('geo_priority', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="float-btn-wrapper flex">
                            <Button label="취소" color="white" onClick={handleBack} />
                            <Button label="저장" color="black" type="submit" />
                        </div>
                    </form>
                </div>
            </BottomSheet>
        </>
    );
}
