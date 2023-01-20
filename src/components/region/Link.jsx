import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListPage from '../layout/ListPage';
import ListWrapper from '../board/List';
import LinkItem from './LinkItem';
import InfoTitle from './../common/InfoTitle';

export default function Link({ data }) {
    const navigate = useNavigate();
    return (
        <ListPage
            title="단말기 연결"
            desc="아래 주소에 연결될 단말기를 선택해주세요"
            content={
                <div className="addr-field">
                    <div className="addr-title">
                        {data?.region_addr_jibun
                            ? data.region_addr_jibun
                            : '주소를 검색하거나 마커를 찍어주세요'}
                    </div>
                    <div className="addr-info">
                        <div className="info-item">
                            <div className="item-label">도로</div>
                            <div className="item-content">
                                {data?.region_addr_road ? data.region_addr_road : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <ListWrapper>
                <div className="app-inner">
                    <InfoTitle label="차량목록" detail={data?.connected.length} />
                    {data &&
                        data.connected.map((item) => <LinkItem key={item.unitid} item={item} />)}
                    {data && !data.connected.length && (
                        <div className="empty">등록된 단말기가 없습니다.</div>
                    )}
                </div>
            </ListWrapper>
        </ListPage>
    );
}
