import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetcher } from './../../lib/fetcher';
import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecentTitle from './RecentTitle';
import 'swiper/css';

export default function Event() {
    const navigate = useNavigate();
    const { data, isLoading } = useSWR('/api/recent?type=event', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, //10초마다 갱신
        revalidateOnFocus: false,
    });
    const handleEvent = () => {
        navigate('/control', {
            state: {
                totalEventMode: true,
            },
        });
    };
    return (
        <div className="recent-wrapper">
            <RecentTitle
                title="이벤트"
                desc="최근 4건의 발생한 이벤트입니다."
                onClick={handleEvent}
            />
            <div className="event-list">
                <Swiper spaceBetween={4} slidesPerView={2}>
                    {isLoading && (
                        <div className="loading-ment">최근 이벤트를 불러오는 중입니다...</div>
                    )}
                    {data &&
                        data.map((item) => (
                            <SwiperSlide key={item.idx}>
                                <div className="event-item" onClick={handleEvent}>
                                    <div className="item-name">{item.unit_nm}</div>
                                    <div className="item-txt">{item.event_code}</div>
                                    <div className="item-date">2023-01-04 14:00:00</div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}
