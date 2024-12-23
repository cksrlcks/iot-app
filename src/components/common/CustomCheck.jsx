import React from 'react';

export default function CustomCheck({ label, value, checked, icon, onChange }) {
    return (
        <label className="custom-check">
            <input type="checkbox" checked={checked} onChange={onChange} />
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
