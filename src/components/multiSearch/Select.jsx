import React, { useState, useEffect, useRef } from 'react';

export default function Select({ label, value, onChange, data, allMode = true, color }) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const unitRef = useRef(null);
    const lists = data ? data.lists : [];
    const sortedData = lists
        ? lists.filter((item1, idx) => {
              return (
                  lists.findIndex((item2) => {
                      return item1.unitid === item2.unitid;
                  }) === idx
              );
          })
        : [];

    useEffect(() => {
        const checkClick = (e) => {
            if (unitRef.current && !unitRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', checkClick);
        return () => {
            document.removeEventListener('click', checkClick);
        };
    }, []);

    return (
        <div
            ref={unitRef}
            className={`search-unit select ${isOpen ? 'on' : ''}`}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <span className={`unit-label ${color ? color : ''}`}>{label}</span>
            <div className="unit-control">
                <input
                    type="text"
                    className="input-datepicker"
                    ref={inputRef}
                    value={value ? value.unit_nm : '전체'}
                    onChange={onChange}
                    readOnly
                />
            </div>
            <i className="ri-arrow-right-s-line icon"></i>
            {isOpen && (
                <ul className="select-panel">
                    {allMode && <li onClick={() => onChange(null)}>전체</li>}
                    {sortedData.map((item) => (
                        <li key={item.unitid} onClick={() => onChange(item)}>
                            {item.unit_nm}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
