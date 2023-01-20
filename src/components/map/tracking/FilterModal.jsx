import React from 'react';
import { createPortal } from 'react-dom';
export default function FilterModal({ handleFilter }) {
    const modalRoot = document.getElementById('modal');

    return createPortal(
        <div className="common-modal fit">
            <div className="modal-inner">
                <div className="modal-page">
                    <ul className="option-list">
                        <li>
                            <button type="button" onClick={() => handleFilter('unit_nm', 'asc')}>
                                단말기명 오름차순
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleFilter('unit_nm', 'desc')}>
                                단말기명 내림차순
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleFilter('makedate', 'asc')}>
                                최근수신 오름차순
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleFilter('makedate', 'desc')}>
                                최근수신 내림차순
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
