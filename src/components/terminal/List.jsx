import React from 'react';
import ListPage from '../layout/ListPage';
import ListWrapper from '../board/List';
import Item from './Item';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';

export default function List({ data, isLoading }) {
    return (
        <ListPage title="단말목록" desc="단말기의 아이콘과 상태를 설정할 수 있습니다">
            <ListWrapper>
                <div className="app-inner">
                    {isLoading && (
                        <div className="load-more">
                            <img src={LoadingIcon} alt="loading" />
                        </div>
                    )}
                    {data && data.lists.map((item) => <Item key={item.unitid} item={item} />)}
                </div>
            </ListWrapper>
        </ListPage>
    );
}
