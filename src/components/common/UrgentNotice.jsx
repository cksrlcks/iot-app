import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';

export default function UrgentNotice() {
    const { data } = useSWR('/api/urgent', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, //10초마다 갱신
        revalidateOnFocus: false,
    });

    const navigate = useNavigate();

    return (
        <>
            {data && (
                <div
                    className="urgent-notice-wrapper"
                    onClick={() => navigate(`/menu/notice/${data.id}`)}
                >
                    <i className="ri-alarm-warning-fill icon-alert"></i>
                    <div className="urgent-notice">{data.title}</div>
                    <i className="ri-arrow-right-s-line icon-arrow"></i>
                </div>
            )}
        </>
    );
}
