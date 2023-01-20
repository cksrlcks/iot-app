import React from 'react';

export default function Input({ label, name, value, onChange, type, placeholder }) {
    const handleReset = () => {
        onChange({
            target: {
                name: name,
                value: '',
            },
        });
    };
    return (
        <div className="custom-input">
            <div className="label">{label}</div>
            <input
                name={name}
                type={type ? type : 'text'}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {/* 폰트아이콘늦게 랜더링되서 마운트 유무에서 opacity조절로 바꿈*/}
            <i
                className={`ri-close-circle-fill reset-btn ${value ? 'on' : ''}`}
                onClick={handleReset}
            >
                <span className="a11y">초기화</span>
            </i>
        </div>
    );
}
