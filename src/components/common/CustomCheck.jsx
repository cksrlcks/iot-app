import React from 'react';

export default function CustomCheck({
    type = 'checkbox',
    label,
    value,
    name,
    checked,
    defaultChecked,
    icon,
    onChange,
}) {
    if (type === 'checkbox') {
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
    } else {
        return (
            <label className="custom-check">
                <input
                    type={type}
                    value={value}
                    defaultChecked={defaultChecked}
                    name={name}
                    onChange={onChange}
                />
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
}
