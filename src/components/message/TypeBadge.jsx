import React from 'react';

export default function TypeBadge({ type }) {
    return <div className={`type-badge ${type}`}>{type}</div>;
}
