import React, { useEffect, useState } from 'react';
import slogon from '../../assets/img/splash/splash-slogon.svg';
import logo from '../../assets/img/splash/splash-logo.svg';
import splash1 from '../../assets/img/splash/app-1.png';
import splash2 from '../../assets/img/splash/app-2.png';
import splash3 from '../../assets/img/splash/app-3.png';
import splash4 from '../../assets/img/splash/app-4.png';
import splash5 from '../../assets/img/splash/app-5.png';
import splash6 from '../../assets/img/splash/app-6.png';

const imgArray = [splash1, splash2, splash3, splash4, splash5, splash6];
const randomIdx = Math.floor(Math.random() * imgArray.length);

export default function Splash({ splash, setSplash, time }) {
    const handleSplash = () => {
        setTimeout(() => {
            setSplash(false);
        }, time);
    };

    return (
        <div className={`splash-screen ${splash ? '' : 'off'} bg-${randomIdx}`}>
            <div className="inner">
                <div className="slogon">
                    <img src={slogon} alt="4guard" />
                </div>
                <div className="logo">
                    <img src={logo} alt="iotplex" />
                </div>
                <img src={imgArray[randomIdx]} onLoad={handleSplash} alt="iotplex" />
            </div>
        </div>
    );
}
