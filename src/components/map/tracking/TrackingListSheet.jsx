import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMap } from '../../../context/MapContext';
import TrackList from './TrackingList';

export default function TrackingList() {
    const { mapState, mapDispatch } = useMap();
    const { isMapClicked } = mapState;

    const [open, setOpen] = useState(true);
    const [fullBtnShow, setFullBtnShow] = useState(true);
    const sheetRef = useRef();

    const iosBottomPadding = +getComputedStyle(document.documentElement)
        .getPropertyValue('--sab')
        .replace('px', '');

    const handleOpen = () => {
        setFullBtnShow(false);
        setTimeout(function () {
            sheetRef.current.snapTo(({ maxHeight }) => maxHeight);
        }, 100);
    };

    useEffect(() => {
        sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));
    }, [isMapClicked]);

    return (
        <>
            <button
                type="button"
                className={`full-btn ${fullBtnShow ? '' : 'hide'}`}
                onClick={handleOpen}
            >
                목록보기
            </button>
            <BottomSheet
                className="bottom-sheet"
                open={open}
                ref={sheetRef}
                skipInitialTransition={true}
                defaultSnap={({ snapPoints }) => Math.min(...snapPoints)}
                snapPoints={({ maxHeight }) => [
                    maxHeight - maxHeight / 10,
                    maxHeight / 4,
                    94 + iosBottomPadding,
                ]}
                blocking={false}
                expandOnContentDrag={true}
                onSpringEnd={() => {
                    requestAnimationFrame(() => {
                        if (sheetRef.current?.height < 100 + iosBottomPadding) {
                            return setFullBtnShow(true);
                        } else {
                            return setFullBtnShow(false);
                        }
                    });
                }}
            >
                <TrackList drawer={sheetRef} />
            </BottomSheet>
        </>
    );
}
