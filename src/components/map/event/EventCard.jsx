import React from 'react';

export default function EventCard({ name, date, content }) {
    return (
        <li>
            <div className="event-card">
                <div className="card-header">
                    <div className="item-name">{name}</div>
                    <div className="item-date">{date}</div>
                </div>
                <div className="card-body">{content}</div>
            </div>
        </li>
    );
}
