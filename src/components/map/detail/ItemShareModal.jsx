import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import InputMask from 'react-input-mask';
import ShareIcon from '../../../assets/img/common/icon-share.svg';
import Button from '../../button/Button';

export default function ShareModal({ item, isShareModal }) {
    const modalRoot = document.getElementById('modal');
    const [phoneNumber, setPhoneNumber] = useState('');
    const inputRef = useRef(null);

    const handleClose = () => {
        setPhoneNumber('');
        isShareModal(false);
    };

    const handleSubmit = () => {
        inputRef.current.blur();

        //blur되기 조금 기다려주기
        setTimeout(function () {
            if (!phoneNumber.trim().length) {
                alert('핸드폰 번호를 입력해주세요');
                return false;
            }

            const confirm = window.confirm(`${phoneNumber}의 번호로 현위치를 공유합니다.`);

            if (confirm) {
                inputRef.current.blur();
                setPhoneNumber('');
                isShareModal(false);
                alert('전송하였습니다.');
            }
        }, 200);
    };

    return createPortal(
        <div className="common-modal compact" onClick={() => isShareModal(false)}>
            <div className="modal-inner">
                <div className="modal-page" onClick={(e) => e.stopPropagation()}>
                    <figure className="modal-icon">
                        <img src={ShareIcon} alt="현 위치 공유" />
                    </figure>
                    <div className="modal-name">현 위치 공유</div>
                    <div className="modal-title">{item.unitnm}</div>
                    <div className="modal-input">
                        <InputMask
                            ref={inputRef}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            mask="999-9999-9999"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                            placeholder="휴대폰 번호를 입력해주세요"
                            maskPlaceholder="0"
                        />
                    </div>
                    <div className="btn-flex">
                        <Button label="닫기" color="white" onClick={handleClose} />
                        <Button label="전송" color="black" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
