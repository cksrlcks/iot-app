import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from './../../lib/fetcher';
import RecentTitle from './RecentTitle';

export default function Notice() {
    const navigate = useNavigate();
    const { data, isLoading } = useSWR('/api/recent?type=notice', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, //10초마다 갱신
        revalidateOnFocus: false,
    });
    return (
        <div className="recent-wrapper">
            <RecentTitle title="공지사항" onClick={() => navigate('/menu/notice')} />
            <ul className="notice-list">
                {data &&
                    data.map((item) => (
                        <li key={item.id} onClick={() => navigate(`/menu/notice/${item.id}`)}>
                            <div className="notice-item">
                                <div className="item-txt">{item.title}</div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
