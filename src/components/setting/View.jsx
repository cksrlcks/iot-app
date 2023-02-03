import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InputMask from 'react-input-mask';
import ListPage from './../layout/ListPage';
import Button from './../button/Button';
import CustomRadio from './../common/CustomRadio';

export default function View({ data }) {
    const navigate = useNavigate();
    const {
        user: { type },
    } = useAuth();
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        companyCode: '',
        password: '',
        phone: '',
        email: '',
        refreshPeriod: 0,
    });

    const onChangeFormData = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (data) {
            setFormData((prev) => ({ ...prev, ...data }));
        }
    }, [data]);

    const refreshTime = [10, 20, 30, 60, 120, 180];

    const handlePush = () => {
        alert('초기화하였습니다.');
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('보냅니다 데이터');
        console.log(formData);
    };

    return (
        <ListPage title="개인설정" mode="view">
            <div className="app-inner">
                {data && (
                    <div className="common-view-wrapper">
                        <div className="info-group">
                            <div className="row">
                                <div className="row-label">사용자 아이디</div>
                                <div className="row-content">{data.userId}</div>
                            </div>
                            <div className="row">
                                <div className="row-label">사용자명</div>
                                <div className="row-content">{data.userName}</div>
                            </div>
                        </div>
                        <hr />
                        {data && type === 'normal' ? (
                            <div className="info-group">
                                <div className="row block">
                                    <div className="row-label">유의사항</div>
                                    <div className="row-content">
                                        관리자 비밀번호 수정은 전산팀으로 문의하십시요
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="row-label">현재 비밀번호</div>
                                    <div className="row-content">
                                        <div className="form-input">
                                            <input
                                                type="password"
                                                placeholder="비밀번호를 입력해주세요"
                                                value={formData.password}
                                                name="pasword"
                                                onChange={(e) =>
                                                    onChangeFormData('pasword', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">신규 비밀번호</div>
                                    <div className="row-content">
                                        <div className="form-input">
                                            <input
                                                type="password"
                                                placeholder="신규 비밀번호를 입력해주세요"
                                                value={formData.new_password}
                                                name="new_pasword"
                                                onChange={(e) =>
                                                    onChangeFormData('new_pasword', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">현재 비밀번호</div>
                                    <div className="row-content">
                                        <div className="form-input">
                                            <input
                                                type="password"
                                                placeholder="비밀번호를 다시한번 입력해주세요"
                                                value={formData.new_password_check}
                                                name="new_password_check"
                                                onChange={(e) =>
                                                    onChangeFormData(
                                                        'new_password_check',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">휴대폰번호</div>
                                    <div className="row-content">
                                        <div className="form-input">
                                            <InputMask
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                mask="999-9999-9999"
                                                value={formData.phone}
                                                name="phone"
                                                onChange={(e) =>
                                                    onChangeFormData('phone', e.target.value)
                                                }
                                                placeholder="휴대폰 번호를 입력해주세요"
                                                maskPlaceholder="_"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">메일주소</div>
                                    <div className="row-content">
                                        <div className="form-input">
                                            <input
                                                type="text"
                                                placeholder="이메일 주소를 입력해주세요"
                                                value={formData.email}
                                                name="email"
                                                onChange={(e) =>
                                                    onChangeFormData('email', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">MAP화면 갱신주기</div>
                                    <div className="row-content">
                                        <div className="check-group col-6 narrow">
                                            {refreshTime.map((item) => {
                                                return (
                                                    <CustomRadio
                                                        value={item}
                                                        name="refreshPeriod"
                                                        label={
                                                            item > 30
                                                                ? `${item / 60}분`
                                                                : `${item}초`
                                                        }
                                                        key={item}
                                                        checked={formData.refreshPeriod === item}
                                                        onChange={(e) =>
                                                            onChangeFormData(
                                                                'refreshPeriod',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="row-label">PUSH KEY 초기화</div>
                                    <div className="row-content">
                                        <Button
                                            label="PUSH KEY 초기화"
                                            type="button"
                                            className="small-btn"
                                            onClick={handlePush}
                                            color="white"
                                        />
                                    </div>
                                </div>
                                <div className="float-btn-wrapper flex">
                                    <Button label="취소" color="white" onClick={handleBack} />
                                    <Button label="저장" color="black" type="submit" />
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </ListPage>
    );
}
