import React from 'react';
import { createPortal } from 'react-dom';
import Button from './../button/Button';
import Icon from '../../assets/img/drive/icon-drive.svg';

export default function Modal({ handleConfirm, stop, setOpen }) {
    const modalRoot = document.getElementById('modal');
    return createPortal(
        <div className="common-modal compact" onClick={() => setOpen(false)}>
            <div className="modal-inner">
                <div className="modal-page" onClick={(e) => e.stopPropagation()}>
                    <figure className="modal-icon">
                        <img src={Icon} alt="차량운행" height={46} />
                    </figure>
                    <div className="modal-name">차량운행</div>
                    <div className="modal-title">
                        {stop ? '운행을 종료합니다' : '운행을 시작합니다.'}
                    </div>
                    <div className="btn-flex">
                        <Button label="닫기" color="white" onClick={() => setOpen(false)} />
                        <Button label="전송" color="black" onClick={handleConfirm} />
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
