import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Tab({ tab }) {
    return (
        <div className="tab-wrapper">
            {tab.map((item) => (
                <NavLink key={item.path} to={item.path} exact="true" className="tab-nav">
                    {item.label}
                </NavLink>
            ))}
        </div>
    );
}
