import React, { useState, useEffect } from 'react';
import DaumPostCode from 'react-daum-postcode';
import { createPortal } from 'react-dom';
import { searchByDaumPost } from './../../lib/mapHelper';
import { useMap } from '../../context/RegionContext';
import IconPost from '../../assets/img/common/icon-post.svg';

export default function DaumPostBtn({ setFormData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);
    const { mapState, mapDispatch } = useMap();

    const handleResult = (data) => {
        setResult(data);
        setIsOpen(false);
    };

    useEffect(() => {
        if (result) {
            mapDispatch({
                type: 'SET_COORDS',
                payload: { y: result.y, x: result.x },
            });

            setFormData((prev) => ({
                ...prev,
                region_addr_road: result.roadAddress,
                region_addr_jibun: result.jibunAddress,
                latitude: result.y,
                longitude: result.x,
            }));
        }
    }, [result, mapDispatch, setFormData]);

    return (
        <>
            <div className="find-addr">
                <button type="button" className="find-btn" onClick={() => setIsOpen(true)}>
                    <img src={IconPost} className="icon" alt="주소찾기" />
                    주소찾기
                </button>
            </div>
            {isOpen && <DaumPost setIsOpen={setIsOpen} handleResult={handleResult} />}
        </>
    );
}

function DaumPost({ handleResult, setIsOpen }) {
    const el = document.querySelector('#modal');
    const handleComplete = async (data) => {
        let fullAddr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
            fullAddr = data.roadAddress;
        } else {
            fullAddr = data.jibunAddress;
        }

        const addressInfo = await searchByDaumPost(fullAddr);
        handleResult(addressInfo);
    };
    return createPortal(
        <div className="post-layer" onClick={() => setIsOpen(false)}>
            <div className="inner">
                <DaumPostCode
                    onComplete={handleComplete}
                    className="daum-post"
                    onClick={(e) => e.stopPropergation()}
                />
            </div>
        </div>,
        el
    );
}
