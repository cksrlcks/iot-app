import React from 'react';
import TypeBadge from './TypeBadge';

export default function MessageItem({ item }) {
    return (
        <li className="item message-card">
            <div className="item-body">
                <div className="message-top">
                    <div className="info">
                        <TypeBadge type={item.method} />
                        <div className="name">{item.userName}</div>
                    </div>
                    <div className="summary">
                        <div className="label">{item.makedate}</div>
                    </div>
                </div>
                <div className="message-content">{item.content}</div>
            </div>
        </li>
    );
}
