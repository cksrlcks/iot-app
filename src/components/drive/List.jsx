import React from 'react';
import ListPage from '../layout/ListPage';
import ListWrapper from '../board/List';
import Item from './Item';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';
import InfoTitle from '../common/InfoTitle';

export default function List({ data, isLoading }) {
    return (
        <ListPage title="운행체크" desc="운행을 시작할 차량을 선택해주세요">
            <ListWrapper>
                <div className="app-inner">
                    <InfoTitle label="차량목록" detail={data?.lists.length} />
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
