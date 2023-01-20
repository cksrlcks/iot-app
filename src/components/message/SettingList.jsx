import React from 'react';
import ListWrapper from '../board/List';
import Item from './SettingItem';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';

export default function SettingList({ data, isLoading }) {
    return (
        <ListWrapper>
            <div className="app-inner">
                {isLoading && (
                    <div className="load-more">
                        <img src={LoadingIcon} alt="loading" />
                    </div>
                )}
                {data && data.map((item) => <Item key={item.userId} item={item} />)}
            </div>
        </ListWrapper>
    );
}
