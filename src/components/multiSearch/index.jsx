import React from 'react';
import Button from '../button/Button';

export default function MultiSearch({ children, label, onClick, className }) {
    return (
        <div className={`multi-search-form ${className ? className : ''}`}>
            <div className="search-unit-wrapper">{children}</div>
            {onClick && <Button label={label} onClick={onClick} color="black" />}
        </div>
    );
}
