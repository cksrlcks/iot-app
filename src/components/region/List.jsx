import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListPage from '../layout/ListPage';
import ListWrapper from '../board/List';
import Item from './Item';
import Button from './../button/Button';
import LoadingIcon from '../../assets/img/common/icon-loading.svg';

export default function List({ data, mutate, isLoading }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('./write');
    };

    const deleteItem = (item) => {
        const filterd = data.lists.filter((list) => list.id !== item.id);
        mutate({ ...data, lists: filterd }, false);
    };

    return (
        <ListPage title="지역설정" desc="진입이탈 등록 및 단말기 연결">
            <ListWrapper>
                <div className="app-inner">
                    {isLoading && (
                        <div className="load-more">
                            <img src={LoadingIcon} alt="loading" />
                        </div>
                    )}
                    {data &&
                        data.lists.map((item) => (
                            <Item key={item.id} item={item} deleteItem={deleteItem} />
                        ))}
                    {data && !data.lists.length && (
                        <div className="empty">등록된 지역이 없습니다.</div>
                    )}
                    <div className="float-btn-wrapper">
                        <Button label="진입이탈 등록" color="black" onClick={handleClick} />
                    </div>
                </div>
            </ListWrapper>
        </ListPage>
    );
}
