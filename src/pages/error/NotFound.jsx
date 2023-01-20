import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Button from '../../components/button/Button';
import Safearea from '../../components/layout/Safearea';
import ErrorImg from '../../assets/img/common/icon-error.svg';

export default function NotFound() {
    const navigate = useNavigate();
    let error = useRouteError();
    console.log(error);
    return (
        <Safearea>
            <div className="app-inner">
                <div className="error-page">
                    <img src={ErrorImg} alt="error" />
                    <div className="ment">페이지가 존재하지 않거나 오류가 발생했습니다.</div>
                    <Button label="뒤로가기" color="white" onClick={() => navigate(-1)} />
                </div>
            </div>
        </Safearea>
    );
}
