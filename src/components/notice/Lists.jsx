import React from 'react';
import ListPage from './../layout/ListPage';
import ListWrapper from '../board/List';
import Item from './Item';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';

export default function Lists({ data, isLoading }) {
    return (
        <ListPage title="공지사항" desc="시스템 사용 관련 공지사항을 확인해 보세요">
            <ListWrapper>
                <div className="app-inner">
                    {isLoading && (
                        <div className="load-more">
                            <img src={LoadingIcon} alt="loading" />
                        </div>
                    )}
                    {data && data.map((item) => <Item key={item.id} item={item} />)}
                </div>
            </ListWrapper>
        </ListPage>
    );
}
