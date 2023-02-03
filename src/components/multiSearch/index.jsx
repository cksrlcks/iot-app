import React, { Children } from 'react';
import Button from '../button/Button';

export default function MultiSearch({ children, label, onClick, className = '' }) {
    const count = Children.count(children) || '';
    return (
        <div className={`multi-search-form ${className} item-${count}`}>
            <div className="search-unit-wrapper">{children}</div>
            {onClick && <Button label={label} onClick={onClick} color="black" />}
        </div>
    );
}
