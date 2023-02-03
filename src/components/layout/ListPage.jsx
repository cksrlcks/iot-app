import React from 'react';
import Tab from './../common/Tab';

export default function ListPage({
    children,
    search = '',
    content = '',
    title,
    desc,
    mode = 'list',
    tab,
}) {
    return (
        <div className={`list-page-wrapper ${mode}-mode`}>
            <div className="page-header">
                <div className="app-inner">
                    <div className="page-title">{title}</div>
                    {mode === 'list' && desc && <div className="page-desc">{desc}</div>}
                    {search}
                    {content}
                    {tab && <Tab tab={tab} />}
                </div>
            </div>
            <div className="page-body">{children}</div>
        </div>
    );
}
