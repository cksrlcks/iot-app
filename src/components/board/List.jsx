import React from 'react';

export default function List({ children, className = '' }) {
    return (
        <div className={`common-list-wrapper safe-bottom-padding ${className}`}>
            <ul className="list">{children}</ul>
        </div>
    );
}
