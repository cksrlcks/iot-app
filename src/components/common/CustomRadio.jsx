import React from 'react';

export default function CustomRadio({ label, value, name, checked, icon, onChange }) {
    return (
        <label className="custom-check">
            <input type="radio" value={value} checked={checked} name={name} onChange={onChange} />
            {icon ? (
                <>
                    <div className={`label-icon ${value}`}></div>
                    <div className="label-name">{label}</div>
                </>
            ) : (
                <div className="label">{label}</div>
            )}
        </label>
    );
}
