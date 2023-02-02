import React, { useEffect, useState, useRef } from 'react';
import InputRange from '../../lib/input-range';

export default function Range({ name, defaultValue, min, max, step, onChangeFormData }) {
    const rangeRef = useRef(null);
    const [rangeInput, setRangeInput] = useState(null);
    const callBack = (value) => {
        onChangeFormData(name, value);
    };
    useEffect(() => {
        if (rangeRef.current && !rangeInput) {
            setRangeInput(
                new InputRange(
                    rangeRef.current,
                    {
                        label: true,
                        unit: 'km',
                        ticks: true,
                    },
                    callBack
                )
            );
        }
    }, [rangeRef, rangeInput]);

    const handleChange = (e) => {
        onChangeFormData(name, e.target.value);
    };
    useEffect(() => {
        if (rangeInput) {
            rangeInput.set(defaultValue);
        }
    }, [defaultValue, rangeInput]);

    return (
        <div className="custom-range">
            <input
                type="range"
                className="custom-range"
                ref={rangeRef}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                onMouseUp={handleChange}
                onTouchEnd={handleChange}
                onChange={handleChange}
            />
        </div>
    );
}
