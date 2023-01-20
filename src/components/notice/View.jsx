import React from 'react';
import ListPage from './../layout/ListPage';

export default function View({ data }) {
    const createContent = () => {
        return { __html: data.content };
    };

    return (
        <ListPage title="공지사항" mode="view">
            <div className="app-inner">
                {data && (
                    <div className="common-view-wrapper">
                        <div className="view-header">
                            <div className="item">
                                <div className="item-body">
                                    <div className="item-title">
                                        {data.urgent && <span className="badge">긴급</span>}
                                        <div className="title line-1">{data.title}</div>
                                    </div>
                                </div>
                                <div className="item-footer">
                                    <div className="unit">
                                        <span className="unit-label">작성</span>
                                        <span className="unit-content">{data.writer}</span>
                                    </div>
                                    <div className="unit">
                                        <div className="unit-content">{data.date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="view-body">
                            <div
                                className="content-box pre-line"
                                dangerouslySetInnerHTML={createContent()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </ListPage>
    );
}
